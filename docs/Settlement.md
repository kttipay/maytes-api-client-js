
# Settlement


## Properties

Name | Type
------------ | -------------
`uuid` | string
`merchantUuid` | string
`periodFrom` | Date
`periodTo` | Date
`idempotencyKey` | string
`merchantPayableAmount` | number
`settledAmount` | number
`currency` | string
`status` | string
`stripeTransferId` | string
`notes` | string
`settledAt` | Date
`expiresAt` | Date
`reviewedByUserUuid` | string
`reviewedAt` | Date
`rejectionReason` | string
`createdAt` | Date
`updatedAt` | Date

## Example

```typescript
import type { Settlement } from '@maytes/api-client-ts'

// TODO: Update the object below with actual values
const example = {
  "uuid": null,
  "merchantUuid": null,
  "periodFrom": null,
  "periodTo": null,
  "idempotencyKey": null,
  "merchantPayableAmount": null,
  "settledAmount": null,
  "currency": null,
  "status": null,
  "stripeTransferId": null,
  "notes": null,
  "settledAt": null,
  "expiresAt": null,
  "reviewedByUserUuid": null,
  "reviewedAt": null,
  "rejectionReason": null,
  "createdAt": null,
  "updatedAt": null,
} satisfies Settlement

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Settlement
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


