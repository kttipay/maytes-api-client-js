
# Checkout


## Properties

Name | Type
------------ | -------------
`checkoutUuid` | string
`merchantOrderId` | string
`status` | string
`transactionRef` | string
`checkoutUrl` | string
`merchantExpiresAt` | Date
`capturedAt` | Date
`returnUrl` | string
`cancelUrl` | string
`amount` | number
`currency` | string
`serviceFee` | [Fee](Fee.md)
`refundedAmount` | number
`merchantProcessorFee` | number
`merchantServiceFee` | number
`lastRefundAt` | Date

## Example

```typescript
import type { Checkout } from '@maytes/api-client-ts'

// TODO: Update the object below with actual values
const example = {
  "checkoutUuid": null,
  "merchantOrderId": null,
  "status": null,
  "transactionRef": null,
  "checkoutUrl": null,
  "merchantExpiresAt": null,
  "capturedAt": null,
  "returnUrl": null,
  "cancelUrl": null,
  "amount": null,
  "currency": null,
  "serviceFee": null,
  "refundedAmount": null,
  "merchantProcessorFee": null,
  "merchantServiceFee": null,
  "lastRefundAt": null,
} satisfies Checkout

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Checkout
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


