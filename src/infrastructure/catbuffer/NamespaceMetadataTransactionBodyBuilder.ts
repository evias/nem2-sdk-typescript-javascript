// tslint:disable: jsdoc-format
/**
*** Copyright (c) 2016-present,
*** Jaguar0625, gimre, BloodyRookie, Tech Bureau, Corp. All rights reserved.
***
*** This file is part of Catapult.
***
*** Catapult is free software: you can redistribute it and/or modify
*** it under the terms of the GNU Lesser General Public License as published by
*** the Free Software Foundation, either version 3 of the License, or
*** (at your option) any later version.
***
*** Catapult is distributed in the hope that it will be useful,
*** but WITHOUT ANY WARRANTY; without even the implied warranty of
*** MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
*** GNU Lesser General Public License for more details.
***
*** You should have received a copy of the GNU Lesser General Public License
*** along with Catapult. If not, see <http://www.gnu.org/licenses/>.
**/

import { GeneratorUtils } from './GeneratorUtils';
import { KeyDto } from './KeyDto';
import { NamespaceIdDto } from './NamespaceIdDto';

/** Binary layout for a namespace metadata transaction. */
export class NamespaceMetadataTransactionBodyBuilder {
    /** Metadata target public key. */
    targetPublicKey: KeyDto;
    /** Metadata key scoped to source, target and type. */
    scopedMetadataKey: number[];
    /** Target namespace identifier. */
    targetNamespaceId: NamespaceIdDto;
    /** Change in value size in bytes. */
    valueSizeDelta: number;
    /** Difference between existing value and new value \note when there is no existing value, new value is same this value \note when there is an existing value, new value is calculated as xor(previous-value, value). */
    value: Uint8Array;

    /**
     * Constructor.
     *
     * @param targetPublicKey Metadata target public key.
     * @param scopedMetadataKey Metadata key scoped to source, target and type.
     * @param targetNamespaceId Target namespace identifier.
     * @param valueSizeDelta Change in value size in bytes.
     * @param value Difference between existing value and new value.
     * @note when there is no existing value, new value is same this value.
     * @note when there is an existing value, new value is calculated as xor(previous-value, value).
     */
    // tslint:disable-next-line: max-line-length
    public constructor(targetPublicKey: KeyDto,  scopedMetadataKey: number[],  targetNamespaceId: NamespaceIdDto,  valueSizeDelta: number,  value: Uint8Array) {
        this.targetPublicKey = targetPublicKey;
        this.scopedMetadataKey = scopedMetadataKey;
        this.targetNamespaceId = targetNamespaceId;
        this.valueSizeDelta = valueSizeDelta;
        this.value = value;
    }

    /**
     * Creates an instance of NamespaceMetadataTransactionBodyBuilder from binary payload.
     *
     * @param payload Byte payload to use to serialize the object.
     * @return Instance of NamespaceMetadataTransactionBodyBuilder.
     */
    public static loadFromBinary(payload: Uint8Array): NamespaceMetadataTransactionBodyBuilder {
        const byteArray = Array.from(payload);
        const targetPublicKey = KeyDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, targetPublicKey.getSize());
        const scopedMetadataKey = GeneratorUtils.bufferToUint64(GeneratorUtils.getBytes(Uint8Array.from(byteArray), 8));
        byteArray.splice(0, 8);
        const targetNamespaceId = NamespaceIdDto.loadFromBinary(Uint8Array.from(byteArray));
        byteArray.splice(0, targetNamespaceId.getSize());
        const valueSizeDelta = GeneratorUtils.bufferToUint(GeneratorUtils.getBytes(Uint8Array.from(byteArray), 2));
        byteArray.splice(0, 2);
        const valueSize = GeneratorUtils.bufferToUint(GeneratorUtils.getBytes(Uint8Array.from(byteArray), 2));
        byteArray.splice(0, 2);
        const value = GeneratorUtils.getBytes(Uint8Array.from(byteArray), valueSize);
        byteArray.splice(0, valueSize);
        // tslint:disable-next-line: max-line-length
        return new NamespaceMetadataTransactionBodyBuilder(targetPublicKey, scopedMetadataKey, targetNamespaceId, valueSizeDelta, value);
    }

    /**
     * Gets metadata target public key.
     *
     * @return Metadata target public key.
     */
    public getTargetPublicKey(): KeyDto {
        return this.targetPublicKey;
    }

    /**
     * Gets metadata key scoped to source, target and type.
     *
     * @return Metadata key scoped to source, target and type.
     */
    public getScopedMetadataKey(): number[] {
        return this.scopedMetadataKey;
    }

    /**
     * Gets target namespace identifier.
     *
     * @return Target namespace identifier.
     */
    public getTargetNamespaceId(): NamespaceIdDto {
        return this.targetNamespaceId;
    }

    /**
     * Gets change in value size in bytes.
     *
     * @return Change in value size in bytes.
     */
    public getValueSizeDelta(): number {
        return this.valueSizeDelta;
    }

    /**
     * Gets difference between existing value and new value.
     * @note when there is no existing value, new value is same this value.
     * @note when there is an existing value, new value is calculated as xor(previous-value, value).
     *
     * @return Difference between existing value and new value.
     * @note when there is no existing value, new value is same this value.
     * @note when there is an existing value, new value is calculated as xor(previous-value, value).
     */
    public getValue(): Uint8Array {
        return this.value;
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public getSize(): number {
        let size = 0;
        size += this.targetPublicKey.getSize();
        size += 8; // scopedMetadataKey
        size += this.targetNamespaceId.getSize();
        size += 2; // valueSizeDelta
        size += 2; // valueSize
        size += this.value.length;
        return size;
    }

    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public serialize(): Uint8Array {
        let newArray = Uint8Array.from([]);
        const targetPublicKeyBytes = this.targetPublicKey.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, targetPublicKeyBytes);
        const scopedMetadataKeyBytes = GeneratorUtils.uint64ToBuffer(this.getScopedMetadataKey());
        newArray = GeneratorUtils.concatTypedArrays(newArray, scopedMetadataKeyBytes);
        const targetNamespaceIdBytes = this.targetNamespaceId.serialize();
        newArray = GeneratorUtils.concatTypedArrays(newArray, targetNamespaceIdBytes);
        const valueSizeDeltaBytes = GeneratorUtils.uintToBuffer(this.getValueSizeDelta(), 2);
        newArray = GeneratorUtils.concatTypedArrays(newArray, valueSizeDeltaBytes);
        const valueSizeBytes = GeneratorUtils.uintToBuffer(this.value.length, 2);
        newArray = GeneratorUtils.concatTypedArrays(newArray, valueSizeBytes);
        newArray = GeneratorUtils.concatTypedArrays(newArray, this.value);
        return newArray;
    }
}
