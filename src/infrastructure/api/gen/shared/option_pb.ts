// @generated by protoc-gen-es v1.7.2 with parameter "target=ts"
// @generated from file shared/option.proto (package shared, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, MethodOptions, proto3 } from "@bufbuild/protobuf";

/**
 * @generated from enum shared.Authentication
 */
export enum Authentication {
  /**
   * @generated from enum value: AUTHENTICATION_UNSPECIFIED = 0;
   */
  AUTHENTICATION_UNSPECIFIED = 0,

  /**
   * @generated from enum value: NOT_REQURED = 1;
   */
  NOT_REQURED = 1,

  /**
   * @generated from enum value: OPTIONAL = 2;
   */
  OPTIONAL = 2,

  /**
   * @generated from enum value: REQURED = 3;
   */
  REQURED = 3,
}
// Retrieve enum metadata with: proto3.getEnumType(Authentication)
proto3.util.setEnumType(Authentication, "shared.Authentication", [
  { no: 0, name: "AUTHENTICATION_UNSPECIFIED" },
  { no: 1, name: "NOT_REQURED" },
  { no: 2, name: "OPTIONAL" },
  { no: 3, name: "REQURED" },
]);

/**
 * @generated from message shared.TwinteMethodOptions
 */
export class TwinteMethodOptions extends Message<TwinteMethodOptions> {
  /**
   * @generated from field: shared.Authentication authentication = 1;
   */
  authentication = Authentication.AUTHENTICATION_UNSPECIFIED;

  /**
   * @generated from field: repeated string error_codes = 2;
   */
  errorCodes: string[] = [];

  constructor(data?: PartialMessage<TwinteMethodOptions>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "shared.TwinteMethodOptions";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "authentication", kind: "enum", T: proto3.getEnumType(Authentication) },
    { no: 2, name: "error_codes", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TwinteMethodOptions {
    return new TwinteMethodOptions().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TwinteMethodOptions {
    return new TwinteMethodOptions().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TwinteMethodOptions {
    return new TwinteMethodOptions().fromJsonString(jsonString, options);
  }

  static equals(a: TwinteMethodOptions | PlainMessage<TwinteMethodOptions> | undefined, b: TwinteMethodOptions | PlainMessage<TwinteMethodOptions> | undefined): boolean {
    return proto3.util.equals(TwinteMethodOptions, a, b);
  }
}

/**
 * @generated from extension: shared.TwinteMethodOptions twinte = 50000;
 */
export const twinte = proto3.makeExtension<MethodOptions, TwinteMethodOptions>(
  "shared.twinte", 
  MethodOptions, 
  () => ({ no: 50000, kind: "message", T: TwinteMethodOptions }),
);

