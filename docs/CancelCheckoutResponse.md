
# CancelCheckoutResponse


## Properties

Name | Type
------------ | -------------
`data` | [CheckoutCancelled](CheckoutCancelled.md)

## Example

```typescript
import type { CancelCheckoutResponse } from '@maytes/api-client-ts'

// TODO: Update the object below with actual values
const example = {
  "data": null,
} satisfies CancelCheckoutResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CancelCheckoutResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


