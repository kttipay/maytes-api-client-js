
# CheckoutCancelled


## Properties

Name | Type
------------ | -------------
`checkoutUuid` | string
`merchantOrderId` | string
`status` | string

## Example

```typescript
import type { CheckoutCancelled } from '@maytes/api-client-ts'

// TODO: Update the object below with actual values
const example = {
  "checkoutUuid": null,
  "merchantOrderId": null,
  "status": null,
} satisfies CheckoutCancelled

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CheckoutCancelled
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


