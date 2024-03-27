// @generated by protoc-gen-es v1.7.2 with parameter "target=ts"
// @generated from file shared/type.proto (package shared, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";

/**
 * @generated from enum shared.Weekday
 */
export enum Weekday {
  /**
   * @generated from enum value: WEEKDAY_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * @generated from enum value: WEEKDAY_SUNDAY = 1;
   */
  SUNDAY = 1,

  /**
   * @generated from enum value: WEEKDAY_MONDAY = 2;
   */
  MONDAY = 2,

  /**
   * @generated from enum value: WEEKDAY_TUESDAY = 3;
   */
  TUESDAY = 3,

  /**
   * @generated from enum value: WEEKDAY_WEDNESDAY = 4;
   */
  WEDNESDAY = 4,

  /**
   * @generated from enum value: WEEKDAY_THURSDAY = 5;
   */
  THURSDAY = 5,

  /**
   * @generated from enum value: WEEKDAY_FRIDAY = 6;
   */
  FRIDAY = 6,

  /**
   * @generated from enum value: WEEKDAY_SATURDAY = 7;
   */
  SATURDAY = 7,
}
// Retrieve enum metadata with: proto3.getEnumType(Weekday)
proto3.util.setEnumType(Weekday, "shared.Weekday", [
  { no: 0, name: "WEEKDAY_UNSPECIFIED" },
  { no: 1, name: "WEEKDAY_SUNDAY" },
  { no: 2, name: "WEEKDAY_MONDAY" },
  { no: 3, name: "WEEKDAY_TUESDAY" },
  { no: 4, name: "WEEKDAY_WEDNESDAY" },
  { no: 5, name: "WEEKDAY_THURSDAY" },
  { no: 6, name: "WEEKDAY_FRIDAY" },
  { no: 7, name: "WEEKDAY_SATURDAY" },
]);

/**
 * @generated from message shared.AcademicYear
 */
export class AcademicYear extends Message<AcademicYear> {
  /**
   * @generated from field: int32 value = 1;
   */
  value = 0;

  constructor(data?: PartialMessage<AcademicYear>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "shared.AcademicYear";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "value", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): AcademicYear {
    return new AcademicYear().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): AcademicYear {
    return new AcademicYear().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): AcademicYear {
    return new AcademicYear().fromJsonString(jsonString, options);
  }

  static equals(a: AcademicYear | PlainMessage<AcademicYear> | undefined, b: AcademicYear | PlainMessage<AcademicYear> | undefined): boolean {
    return proto3.util.equals(AcademicYear, a, b);
  }
}

/**
 * @generated from message shared.UUID
 */
export class UUID extends Message<UUID> {
  /**
   * @generated from field: string value = 1;
   */
  value = "";

  constructor(data?: PartialMessage<UUID>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "shared.UUID";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "value", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): UUID {
    return new UUID().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): UUID {
    return new UUID().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): UUID {
    return new UUID().fromJsonString(jsonString, options);
  }

  static equals(a: UUID | PlainMessage<UUID> | undefined, b: UUID | PlainMessage<UUID> | undefined): boolean {
    return proto3.util.equals(UUID, a, b);
  }
}

/**
 * @generated from message shared.UUIDList
 */
export class UUIDList extends Message<UUIDList> {
  /**
   * @generated from field: repeated shared.UUID values = 1;
   */
  values: UUID[] = [];

  constructor(data?: PartialMessage<UUIDList>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "shared.UUIDList";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "values", kind: "message", T: UUID, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): UUIDList {
    return new UUIDList().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): UUIDList {
    return new UUIDList().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): UUIDList {
    return new UUIDList().fromJsonString(jsonString, options);
  }

  static equals(a: UUIDList | PlainMessage<UUIDList> | undefined, b: UUIDList | PlainMessage<UUIDList> | undefined): boolean {
    return proto3.util.equals(UUIDList, a, b);
  }
}

/**
 * e.g. 2006-01-02
 *
 * @generated from message shared.RFC3339FullDate
 */
export class RFC3339FullDate extends Message<RFC3339FullDate> {
  /**
   * @generated from field: string value = 1;
   */
  value = "";

  constructor(data?: PartialMessage<RFC3339FullDate>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "shared.RFC3339FullDate";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "value", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): RFC3339FullDate {
    return new RFC3339FullDate().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): RFC3339FullDate {
    return new RFC3339FullDate().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): RFC3339FullDate {
    return new RFC3339FullDate().fromJsonString(jsonString, options);
  }

  static equals(a: RFC3339FullDate | PlainMessage<RFC3339FullDate> | undefined, b: RFC3339FullDate | PlainMessage<RFC3339FullDate> | undefined): boolean {
    return proto3.util.equals(RFC3339FullDate, a, b);
  }
}

/**
 * e.g. 2006-01-02T15:04:05+09:00
 *
 * @generated from message shared.RFC3339DateTime
 */
export class RFC3339DateTime extends Message<RFC3339DateTime> {
  /**
   * @generated from field: string value = 1;
   */
  value = "";

  constructor(data?: PartialMessage<RFC3339DateTime>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "shared.RFC3339DateTime";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "value", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): RFC3339DateTime {
    return new RFC3339DateTime().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): RFC3339DateTime {
    return new RFC3339DateTime().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): RFC3339DateTime {
    return new RFC3339DateTime().fromJsonString(jsonString, options);
  }

  static equals(a: RFC3339DateTime | PlainMessage<RFC3339DateTime> | undefined, b: RFC3339DateTime | PlainMessage<RFC3339DateTime> | undefined): boolean {
    return proto3.util.equals(RFC3339DateTime, a, b);
  }
}

