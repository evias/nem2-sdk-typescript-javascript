/*
 * Copyright 2019 NEM
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
    AccountLinkTransactionBuilder,
    AmountDto,
    EmbeddedAccountLinkTransactionBuilder,
    EmbeddedTransactionBuilder,
    KeyDto,
    SignatureDto,
    TimestampDto,
} from 'catbuffer';
import { Convert } from '../../core/format';
import { PublicAccount } from '../account/PublicAccount';
import { NetworkType } from '../blockchain/NetworkType';
import { UInt64 } from '../UInt64';
import { Deadline } from './Deadline';
import { LinkAction } from './LinkAction';
import { Transaction } from './Transaction';
import { TransactionInfo } from './TransactionInfo';
import { TransactionType } from './TransactionType';
import { TransactionVersion } from './TransactionVersion';

/**
 * Announce an AccountLinkTransaction to delegate the account importance to a proxy account.
 * By doing so, you can enable delegated harvesting
 */
export class AccountLinkTransaction extends Transaction {
    /**
     * Create a link account transaction object
     * @param deadline - The deadline to include the transaction.
     * @param remotePublicKey - The public key of the remote account.
     * @param linkAction - The account link action.
     * @param maxFee - (Optional) Max fee defined by the sender
     * @returns {AccountLinkTransaction}
     */
    public static create(deadline: Deadline,
                         remotePublicKey: string,
                         linkAction: LinkAction,
                         networkType: NetworkType,
                         maxFee: UInt64 = new UInt64([0, 0])): AccountLinkTransaction {
        return new AccountLinkTransaction(networkType,
            TransactionVersion.ACCOUNT_LINK,
            deadline,
            maxFee,
            remotePublicKey,
            linkAction);
    }

    /**
     * @param networkType
     * @param version
     * @param deadline
     * @param maxFee
     * @param remotePublicKey
     * @param linkAction
     * @param signature
     * @param signer
     * @param transactionInfo
     */
    constructor(networkType: NetworkType,
                version: number,
                deadline: Deadline,
                maxFee: UInt64,
                /**
                 * The public key of the remote account.
                 */
                public readonly remotePublicKey: string,
                /**
                 * The account link action.
                 */
                public readonly linkAction: LinkAction,
                signature?: string,
                signer?: PublicAccount,
                transactionInfo?: TransactionInfo) {
        super(TransactionType.ACCOUNT_LINK, networkType, version, deadline, maxFee, signature, signer, transactionInfo);
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
    public static createFromBodyBuilder(builder: AccountLinkTransactionBuilder | EmbeddedAccountLinkTransactionBuilder,
                                        networkType: NetworkType,
                                        deadline: Deadline,
                                        maxFee: UInt64): Transaction {
        return AccountLinkTransaction.create(
            deadline,
            Convert.uint8ToHex(builder.getRemotePublicKey().key),
            builder.getLinkAction().valueOf(),
            networkType,
            maxFee,
        );
    }

    /**
     * @override Transaction.size()
     * @description get the byte size of a AccountLinkTransaction
     * @returns {number}
     * @memberof AccountLinkTransaction
     */
    public get size(): number {
        const byteSize = super.size;

        // set static byte size fields
        const bytePublicKey = 32;
        const byteLinkAction = 1;

        return byteSize + bytePublicKey + byteLinkAction;
    }

    /**
     * @internal
     * @returns {Uint8Array}
     */
    protected generateBytes(): Uint8Array {
        const signerBuffer = new Uint8Array(32);
        const signatureBuffer = new Uint8Array(64);

        const transactionBuilder = new AccountLinkTransactionBuilder(
            new SignatureDto(signatureBuffer),
            new KeyDto(signerBuffer),
            this.versionToDTO(),
            this.networkType.valueOf(),
            TransactionType.ACCOUNT_LINK.valueOf(),
            new AmountDto(this.maxFee.toDTO()),
            new TimestampDto(this.deadline.toDTO()),
            new KeyDto(Convert.hexToUint8(this.remotePublicKey)),
            this.linkAction.valueOf(),
        );
        return transactionBuilder.serialize();
    }

    /**
     * @internal
     * @returns {EmbeddedTransactionBuilder}
     */
    public toEmbeddedTransaction(): EmbeddedTransactionBuilder {
        return new EmbeddedAccountLinkTransactionBuilder(
            new KeyDto(Convert.hexToUint8(this.signer!.publicKey)),
            this.versionToDTO(),
            this.networkType.valueOf(),
            TransactionType.ACCOUNT_LINK.valueOf(),
            new KeyDto(Convert.hexToUint8(this.remotePublicKey)),
            this.linkAction.valueOf(),
        );
    }

    /**
     * @internal
     * @returns {AccountLinkTransaction}
     */
    resolveAliases(): AccountLinkTransaction {
        return this;
    }
}
