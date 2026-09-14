
# Fee


## Properties

Name | Type
------------ | -------------
`gross` | number
`discount` | number
`net` | number
`breakdown` | [Array&lt;FeeBreakdownLine&gt;](FeeBreakdownLine.md)

## Example

```typescript
import type { Fee } from '@maytes/api-client-ts'

// TODO: Update the object below with actual values
const example = {
  "gross": null,
  "discount": null,
  "net": null,
  "breakdown": null,
} satisfies Fee

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Fee
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


