
# CheckoutDiscount


## Properties

Name | Type
------------ | -------------
`name` | string
`description` | string
`scope` | string
`amount` | number
`currency` | string
`metadata` | { [key: string]: any; }
`appliesTo` | Array&lt;string&gt;

## Example

```typescript
import type { CheckoutDiscount } from '@maytes/api-client-ts'

// TODO: Update the object below with actual values
const example = {
  "name": null,
  "description": null,
  "scope": null,
  "amount": null,
  "currency": null,
  "metadata": null,
  "appliesTo": null,
} satisfies CheckoutDiscount

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CheckoutDiscount
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


