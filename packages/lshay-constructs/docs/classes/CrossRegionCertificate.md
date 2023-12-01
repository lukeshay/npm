[@lshay/constructs](../README.md) / [Exports](../modules.md) / CrossRegionCertificate

# Class: CrossRegionCertificate

A certificate that can be created in any region.

## Hierarchy

- `Construct`

  ↳ **`CrossRegionCertificate`**

## Table of contents

### Constructors

- [constructor](CrossRegionCertificate.md#constructor)

### Properties

- [alternateNames](CrossRegionCertificate.md#alternatenames)
- [certificate](CrossRegionCertificate.md#certificate)
- [certificateArn](CrossRegionCertificate.md#certificatearn)
- [domainName](CrossRegionCertificate.md#domainname)
- [node](CrossRegionCertificate.md#node)
- [region](CrossRegionCertificate.md#region)
- [status](CrossRegionCertificate.md#status)

### Methods

- [toString](CrossRegionCertificate.md#tostring)
- [isConstruct](CrossRegionCertificate.md#isconstruct)

## Constructors

### constructor

• **new CrossRegionCertificate**(`scope`, `id`, `properties`): [`CrossRegionCertificate`](CrossRegionCertificate.md)

#### Parameters

| Name         | Type                                                                                 |
| :----------- | :----------------------------------------------------------------------------------- |
| `scope`      | `Construct`                                                                          |
| `id`         | `string`                                                                             |
| `properties` | [`CrossRegionCertificateProperties`](../modules.md#crossregioncertificateproperties) |

#### Returns

[`CrossRegionCertificate`](CrossRegionCertificate.md)

#### Overrides

Construct.constructor

#### Defined in

[packages/lshay-constructs/src/constructs/cross-region-certificate.ts:140](https://github.com/LukeShay/npm/blob/5159033/packages/lshay-constructs/src/constructs/cross-region-certificate.ts#L140)

## Properties

### alternateNames

• `Readonly` **alternateNames**: `string`[]

#### Defined in

[packages/lshay-constructs/src/constructs/cross-region-certificate.ts:128](https://github.com/LukeShay/npm/blob/5159033/packages/lshay-constructs/src/constructs/cross-region-certificate.ts#L128)

---

### certificate

• `Readonly` **certificate**: `ICertificate`

#### Defined in

[packages/lshay-constructs/src/constructs/cross-region-certificate.ts:130](https://github.com/LukeShay/npm/blob/5159033/packages/lshay-constructs/src/constructs/cross-region-certificate.ts#L130)

---

### certificateArn

• `Readonly` **certificateArn**: `string`

#### Defined in

[packages/lshay-constructs/src/constructs/cross-region-certificate.ts:132](https://github.com/LukeShay/npm/blob/5159033/packages/lshay-constructs/src/constructs/cross-region-certificate.ts#L132)

---

### domainName

• `Readonly` **domainName**: `string`

#### Defined in

[packages/lshay-constructs/src/constructs/cross-region-certificate.ts:134](https://github.com/LukeShay/npm/blob/5159033/packages/lshay-constructs/src/constructs/cross-region-certificate.ts#L134)

---

### node

• `Readonly` **node**: `Node`

The tree node.

#### Inherited from

Construct.node

#### Defined in

node_modules/constructs/lib/construct.d.ts:265

---

### region

• `Readonly` **region**: `string`

#### Defined in

[packages/lshay-constructs/src/constructs/cross-region-certificate.ts:136](https://github.com/LukeShay/npm/blob/5159033/packages/lshay-constructs/src/constructs/cross-region-certificate.ts#L136)

---

### status

• `Readonly` **status**: [`CerticateStatus`](../modules.md#certicatestatus)

#### Defined in

[packages/lshay-constructs/src/constructs/cross-region-certificate.ts:138](https://github.com/LukeShay/npm/blob/5159033/packages/lshay-constructs/src/constructs/cross-region-certificate.ts#L138)

## Methods

### toString

▸ **toString**(): `string`

Returns a string representation of this construct.

#### Returns

`string`

#### Inherited from

Construct.toString

#### Defined in

node_modules/constructs/lib/construct.d.ts:278

---

### isConstruct

▸ **isConstruct**(`x`): x is Construct

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

#### Parameters

| Name | Type  | Description |
| :--- | :---- | :---------- |
| `x`  | `any` | Any object  |

#### Returns

x is Construct

true if `x` is an object created from a class which extends `Construct`.

#### Inherited from

Construct.isConstruct

#### Defined in

node_modules/constructs/lib/construct.d.ts:261
