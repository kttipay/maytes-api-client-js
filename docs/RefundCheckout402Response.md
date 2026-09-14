
# RefundCheckout402Response


## Properties

Name | Type
------------ | -------------
`message` | string
`error` | string
`code` | string
`metadata` | { [key: string]: any; }

## Example

```typescript
import type { RefundCheckout402Response } from '@maytes/api-client-ts'

// TODO: Update the object below with actual values
const example = {
  "message": null,
  "error": null,
  "code": null,
  "metadata": null,
} satisfies RefundCheckout402Response

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as RefundCheckout402Response
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


