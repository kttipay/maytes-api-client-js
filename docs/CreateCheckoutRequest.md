
# CreateCheckoutRequest


## Properties

Name | Type
------------ | -------------
`merchantOrderId` | string
`merchantExpiresAt` | Date
`totalAmount` | number
`currency` | string
`returnUrl` | string
`cancelUrl` | string
`items` | [Array&lt;LineItem&gt;](LineItem.md)
`fees` | [Array&lt;CheckoutFee&gt;](CheckoutFee.md)
`discounts` | [Array&lt;CheckoutDiscount&gt;](CheckoutDiscount.md)
`tax` | [Tax](Tax.md)
`shippingAmount` | number
`customerData` | [CustomerData](CustomerData.md)
`metadata` | { [key: string]: any; }
`allocationModel` | string

## Example

```typescript
import type { CreateCheckoutRequest } from '@maytes/api-client-ts'

// TODO: Update the object below with actual values
const example = {
  "merchantOrderId": null,
  "merchantExpiresAt": null,
  "totalAmount": null,
  "currency": null,
  "returnUrl": null,
  "cancelUrl": null,
  "items": null,
  "fees": null,
  "discounts": null,
  "tax": null,
  "shippingAmount": null,
  "customerData": null,
  "metadata": null,
  "allocationModel": null,
} satisfies CreateCheckoutRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CreateCheckoutRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


