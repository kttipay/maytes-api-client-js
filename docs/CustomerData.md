
# CustomerData


## Properties

Name | Type
------------ | -------------
`name` | string
`mobile` | string
`email` | string

## Example

```typescript
import type { CustomerData } from '@maytes/api-client-ts'

// TODO: Update the object below with actual values
const example = {
  "name": null,
  "mobile": null,
  "email": null,
} satisfies CustomerData

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CustomerData
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


