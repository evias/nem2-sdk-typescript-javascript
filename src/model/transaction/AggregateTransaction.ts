/*
 * Copyright 2018 NEM
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
    AggregateBondedTransactionBuilder,
    AggregateCompleteTransactionBuilder,
    AmountDto,
    CosignatureBuilder,
    EmbeddedTransactionBuilder,
    GeneratorUtils,
    Hash256Dto,
    KeyDto,
    SignatureDto,
    TimestampDto
} from 'catbuffer';
import { KeyPair, MerkleHashBuilder, SHA3Hasher, SignSchema } from '../../core/crypto';
import { Convert } from '../../core/format';
import { DtoMapping } from '../../core/utils/DtoMapping';
import { CreateTransactionFromEmbeddedTransactionBuilder } from '../../infrastructure/transaction/CreateTransactionFromPayload';
import { Account } from '../account/Account';
import { PublicAccount } from '../account/PublicAccount';
import { NetworkType } from '../blockchain/NetworkType';
import { Statement } from '../receipt/Statement';
import { UInt64 } from '../UInt64';
import { AggregateTransactionCosignature } from './AggregateTransactionCosignature';
import { CosignatureSignedTransaction } from './CosignatureSignedTransaction';
import { Deadline } from './Deadline';
import { InnerTransaction } from './InnerTransaction';
import { SignedTransaction } from './SignedTransaction';
import { Transaction } from './Transaction';
import { TransactionInfo } from './TransactionInfo';
import { TransactionType } from './TransactionType';
import { TransactionVersion } from './TransactionVersion';

/**
 * Aggregate innerTransactions contain multiple innerTransactions that can be initiated by different accounts.
 */
export class AggregateTransaction extends Transaction {

    /**
     * @param networkType
     * @param type
     * @param version
     * @param deadline
     * @param maxFee
     * @param innerTransactions
     * @param cosignatures
     * @param signature
     * @param signer
     * @param transactionInfo
     */
    constructor(networkType: NetworkType,
                type: number,
                version: number,
                deadline: Deadline,
                maxFee: UInt64,
                /**
                 * The array of innerTransactions included in the aggregate transaction.
                 */
                public readonly innerTransactions: InnerTransaction[],
                /**
                 * The array of transaction cosigners signatures.
                 */
                public readonly cosignatures: AggregateTransactionCosignature[],
                signature?: string,
                signer?: PublicAccount,
                transactionInfo?: TransactionInfo) {
        super(type, networkType, version, deadline, maxFee, signature, signer, transactionInfo);
    }

    /**
     * Create an aggregate complete transaction object
     * @param deadline - The deadline to include the transaction.
     * @param innerTransactions - The array of inner innerTransactions.
     * @param networkType - The network type.
     * @param cosignatures
     * @param maxFee - (Optional) Max fee defined by the sender
     * @returns {AggregateTransaction}
     */
    public static createComplete(deadline: Deadline,
                                 innerTransactions: InnerTransaction[],
                                 networkType: NetworkType,
                                 cosignatures: AggregateTransactionCosignature[],
                                 maxFee: UInt64 = new UInt64([0, 0])): AggregateTransaction {
        return new AggregateTransaction(networkType,
            TransactionType.AGGREGATE_COMPLETE,
            TransactionVersion.AGGREGATE_COMPLETE,
            deadline,
            maxFee,
            innerTransactions,
            cosignatures,
        );
    }

    /**
     * Create an aggregate bonded transaction object
     * @param {Deadline} deadline
     * @param {InnerTransaction[]} innerTransactions
     * @param {NetworkType} networkType
     * @param {AggregateTransactionCosignature[]} cosignatures
     * @param {UInt64} maxFee - (Optional) Max fee defined by the sender
     * @return {AggregateTransaction}
     */
    public static createBonded(deadline: Deadline,
                               innerTransactions: InnerTransaction[],
                               networkType: NetworkType,
                               cosignatures: AggregateTransactionCosignature[] = [],
                               maxFee: UInt64 = new UInt64([0, 0])): AggregateTransaction {
        return new AggregateTransaction(networkType,
            TransactionType.AGGREGATE_BONDED,
            TransactionVersion.AGGREGATE_BONDED,
            deadline,
            maxFee,
            innerTransactions,
            cosignatures,
        );
    }

    /**
     * Creates a transaction from catbuffer body builders.
     * @internal
     * @param builder the body builder
     * @param networkType the preloaded network type
     * @param deadline the preloaded deadline
     * @param maxFee the preloaded max fee
     * @returns {Transaction}
     */
    public static createFromBodyBuilder(builder: AggregateCompleteTransactionBuilder | AggregateBondedTransactionBuilder,
                                        networkType: NetworkType,
                                        deadline: Deadline,
                                        maxFee: UInt64): Transaction {

        const consignatures = builder.getCosignatures().map((cosig) => {
            return new AggregateTransactionCosignature(
                Convert.uint8ToHex(cosig.signature.signature),
                PublicAccount.createFromPublicKey(Convert.uint8ToHex(cosig.signerPublicKey.key), networkType),
            );
        });

        const innerTransactions = builder.getTransactions().map((transaction) => {
            return CreateTransactionFromEmbeddedTransactionBuilder(transaction as EmbeddedTransactionBuilder) as InnerTransaction;
        });

        return builder.getType().valueOf() === TransactionType.AGGREGATE_COMPLETE ?
            AggregateTransaction.createComplete(
               deadline,
                innerTransactions,
                networkType,
                consignatures,
                maxFee
            ) : AggregateTransaction.createBonded(
                deadline,
                innerTransactions,
                networkType,
                consignatures,
                maxFee
            );
    }


    /**
     * @description add inner transactions to current list
     * @param {InnerTransaction[]} transactions the transactions to be added
     * @returns {AggregateTransaction}
     * @memberof AggregateTransaction
     */
    public addTransactions(transactions: InnerTransaction[]): AggregateTransaction {
        const innerTransactions = this.innerTransactions.concat(transactions);
        return DtoMapping.assign(this, {innerTransactions});
    }

    /**
     * @description add cosignatures to current list
     * @param {AggregateTransactionCosignature[]} cosigs the cosignatures to be added
     * @returns {AggregateTransaction}
     * @memberof AggregateTransaction
     */
    public addCosignatures(cosigs: AggregateTransactionCosignature[]): AggregateTransaction {
        const cosignatures = this.cosignatures.concat(cosigs);
        return DtoMapping.assign(this, {cosignatures});
    }

    /**
     * @internal
     * Sign transaction with cosignatories creating a new SignedTransaction
     * @param initiatorAccount - Initiator account
     * @param cosignatories - The array of accounts that will cosign the transaction
     * @param generationHash - Network generation hash hex
     * @returns {SignedTransaction}
     */
    public signTransactionWithCosignatories(initiatorAccount: Account,
                                            cosignatories: Account[],
                                            generationHash: string): SignedTransaction {
        const signedTransaction = this.signWith(initiatorAccount, generationHash);
        const transactionHashBytes = Convert.hexToUint8(signedTransaction.hash);
        let signedPayload = signedTransaction.payload;
        cosignatories.forEach((cosigner) => {
            const signSchema = SHA3Hasher.resolveSignSchema(cosigner.networkType);
            const signature = KeyPair.sign(cosigner, transactionHashBytes, signSchema);
            signedPayload += cosigner.publicKey + Convert.uint8ToHex(signature);
        });

        // Calculate new size
        const size = `00000000${(signedPayload.length / 2).toString(16)}`;
        const formatedSize = size.substr(size.length - 8, size.length);
        const littleEndianSize = formatedSize.substr(6, 2) + formatedSize.substr(4, 2) +
            formatedSize.substr(2, 2) + formatedSize.substr(0, 2);

        signedPayload = littleEndianSize + signedPayload.substr(8, signedPayload.length - 8);
        return new SignedTransaction(signedPayload, signedTransaction.hash, initiatorAccount.publicKey,
            this.type, this.networkType);
    }

    /**
     * @internal
     * Sign transaction with cosignatories collected from cosigned transactions and creating a new SignedTransaction
     * For off chain Aggregated Complete Transaction co-signing.
     * @param initiatorAccount - Initiator account
     * @param {CosignatureSignedTransaction[]} cosignatureSignedTransactions - Array of cosigned transaction
     * @param generationHash - Network generation hash hex
     * @return {SignedTransaction}
     */
    public signTransactionGivenSignatures(initiatorAccount: Account,
                                          cosignatureSignedTransactions: CosignatureSignedTransaction[],
                                          generationHash: string): SignedTransaction {
        const signedTransaction = this.signWith(initiatorAccount, generationHash);
        let signedPayload = signedTransaction.payload;
        cosignatureSignedTransactions.forEach((cosignedTransaction) => {
            signedPayload += cosignedTransaction.signerPublicKey + cosignedTransaction.signature;
        });

        // Calculate new size
        const size = `00000000${(signedPayload.length / 2).toString(16)}`;
        const formatedSize = size.substr(size.length - 8, size.length);
        const littleEndianSize = formatedSize.substr(6, 2) + formatedSize.substr(4, 2) +
            formatedSize.substr(2, 2) + formatedSize.substr(0, 2);

        signedPayload = littleEndianSize + signedPayload.substr(8, signedPayload.length - 8);
        return new SignedTransaction(signedPayload, signedTransaction.hash, initiatorAccount.publicKey,
            this.type, this.networkType);
    }

    /**
     * Check if account has signed transaction
     * @param publicAccount - Signer public account
     * @returns {boolean}
     */
    public signedByAccount(publicAccount: PublicAccount): boolean {
        return this.cosignatures.find((cosignature) => cosignature.signer.equals(publicAccount)) !== undefined
            || (this.signer !== undefined && this.signer.equals(publicAccount));
    }

    /**
     * @override Transaction.size()
     * @description get the byte size of a AggregateTransaction
     * @returns {number}
     * @memberof AggregateTransaction
     */
    public get size(): number {
        const byteSize = super.size;
        const byteTransactionHash = 32;
        // set static byte size fields
        const bytePayloadSize = 4;

        const byteHeader_Reserved1 = 4;

        // calculate each inner transaction's size
        let byteTransactions = 0;
        this.innerTransactions.forEach((transaction) => {
            const transactionByte = transaction.toAggregateTransactionBytes();
            const innerTransactionPadding = new Uint8Array(this.getInnerTransactionPaddingSize(transactionByte.length, 8));
            const paddedTransactionByte = GeneratorUtils.concatTypedArrays(transactionByte, innerTransactionPadding);
            byteTransactions += paddedTransactionByte.length;
        });

        const byteCosignatures = this.cosignatures.length * 96;
        return byteSize + byteTransactionHash + bytePayloadSize + byteHeader_Reserved1 +
            byteTransactions + byteCosignatures;
    }

    /**
     * @internal
     * @returns {Uint8Array}
     */
    protected generateBytes(): Uint8Array {
        const signerBuffer = new Uint8Array(32);
        const signatureBuffer = new Uint8Array(64);
        const transactions = this.innerTransactions.map((transaction) => (transaction as Transaction).toEmbeddedTransaction());
        const cosignatures = this.cosignatures.map((cosignature) => {
            const signerBytes = Convert.hexToUint8(cosignature.signer.publicKey);
            const signatureBytes = Convert.hexToUint8(cosignature.signature);
            return new CosignatureBuilder(
                new KeyDto(signerBytes),
                new SignatureDto(signatureBytes),
            );
        });

        const transactionBuilder = this.type === TransactionType.AGGREGATE_COMPLETE ?
            new AggregateCompleteTransactionBuilder(
                new SignatureDto(signatureBuffer),
                new KeyDto(signerBuffer),
                this.versionToDTO(),
                this.networkType.valueOf(),
                this.type.valueOf(),
                new AmountDto(this.maxFee.toDTO()),
                new TimestampDto(this.deadline.toDTO()),
                new Hash256Dto(this.calculateInnerTransactionHash()),
                transactions,
                cosignatures,
            ) :
            new AggregateBondedTransactionBuilder(
                new SignatureDto(signatureBuffer),
                new KeyDto(signerBuffer),
                this.versionToDTO(),
                this.networkType.valueOf(),
                this.type.valueOf(),
                new AmountDto(this.maxFee.toDTO()),
                new TimestampDto(this.deadline.toDTO()),
                new Hash256Dto(this.calculateInnerTransactionHash()),
                transactions,
                cosignatures,
            );
        return transactionBuilder.serialize();
    }

    /**
     * @internal
     * @returns {EmbeddedTransactionBuilder}
     */
    public toEmbeddedTransaction(): EmbeddedTransactionBuilder {
        throw new Error('Method not implemented');
    }

    /**
     * @internal
     * Generate inner transaction root hash (merkle tree)
     * @returns {Uint8Array}
     */
    private calculateInnerTransactionHash(): Uint8Array {
        // Note: Transaction hashing *always* uses SHA3
        const hasher = SHA3Hasher.createHasher(32, SignSchema.SHA3);
        const builder = new MerkleHashBuilder(32, SignSchema.SHA3);
        this.innerTransactions.forEach((transaction) => {
            const entityHash: Uint8Array = new Uint8Array(32);

            // for each embedded transaction hash their body
            hasher.reset();
            hasher.update(transaction.toAggregateTransactionBytes());
            hasher.finalize(entityHash);

            // update merkle tree (add transaction hash)
            builder.update(entityHash);
        });

        // calculate root hash with all transactions
        return builder.getRootHash();
    }

    /**
     * Gets the padding size that rounds up \a size to the next multiple of \a alignment.
     * @param size Inner transaction size
     * @param alignment Next multiple alignment
     */
    private getInnerTransactionPaddingSize(size: number, alignment: number): number {
        return 0 === size % alignment ? 0 : alignment - (size % alignment);
    }

    /**
     * @internal
     * @returns {AggregateTransaction}
     */
    resolveAliases(statement: Statement): AggregateTransaction {
        const transactionInfo = this.checkTransactionHeightAndIndex();
        return DtoMapping.assign(this,
            {
                innerTransactions: this.innerTransactions.map((tx) => tx.resolveAliases(statement, transactionInfo.index))
                .sort((a, b) => a.transactionInfo!.index - b.transactionInfo!.index)
            });
    }
}
