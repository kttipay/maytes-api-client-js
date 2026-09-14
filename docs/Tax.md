
# Tax


## Properties

Name | Type
------------ | -------------
`amount` | number
`percentage` | string
`inclusive` | boolean

## Example

```typescript
import type { Tax } from '@maytes/api-client-ts'

// TODO: Update the object below with actual values
const example = {
  "amount": null,
  "percentage": null,
  "inclusive": null,
} satisfies Tax

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Tax
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


