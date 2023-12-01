[@lshay/constructs](README.md) / Exports

# @lshay/constructs

## Table of contents

### Classes

- [CrossRegionCertificate](classes/CrossRegionCertificate.md)

### Type Aliases

- [CerticateStatus](modules.md#certicatestatus)
- [CrossRegionCertificateProperties](modules.md#crossregioncertificateproperties)
- [ValidationMethod](modules.md#validationmethod)

## Type Aliases

### CerticateStatus

Ƭ **CerticateStatus**: `"EXPIRED"` \| `"FAILED"` \| `"INACTIVE"` \| `"ISSUED"` \| `"PENDING_VALIDATION"` \| `"REVOKED"` \| `"VALIDATION_TIMED_OUT"` \| `undefined`

Status of the certificate.

#### Defined in

[packages/lshay-constructs/src/constructs/cross-region-certificate.ts:91](https://github.com/LukeShay/npm/blob/2f2646d/packages/lshay-constructs/src/constructs/cross-region-certificate.ts#L91)

---

### CrossRegionCertificateProperties

Ƭ **CrossRegionCertificateProperties**: `Object`

Properties for creating a [CrossRegionCertificate](classes/CrossRegionCertificate.md).

#### Type declaration

| Name                | Type                                              | Description                                                                           |
| :------------------ | :------------------------------------------------ | :------------------------------------------------------------------------------------ |
| `alternateNames?`   | `string`[]                                        | Additional domain names.                                                              |
| `domainName`        | `string`                                          | The primary domain name.                                                              |
| `region?`           | `string`                                          | The region to create the certificate in. **`Default`** `ts The region of the stack. ` |
| `validationMethod?` | [`ValidationMethod`](modules.md#validationmethod) | The method of validation to use. **`Default`** `ts "DNS" `                            |

#### Defined in

[packages/lshay-constructs/src/constructs/cross-region-certificate.ts:104](https://github.com/LukeShay/npm/blob/2f2646d/packages/lshay-constructs/src/constructs/cross-region-certificate.ts#L104)

---

### ValidationMethod

Ƭ **ValidationMethod**: `"DNS"` \| `"EMAIL"`

The validation method for the certificate.

#### Defined in

[packages/lshay-constructs/src/constructs/cross-region-certificate.ts:86](https://github.com/LukeShay/npm/blob/2f2646d/packages/lshay-constructs/src/constructs/cross-region-certificate.ts#L86)
