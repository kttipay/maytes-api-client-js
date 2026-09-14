
# TicketSeating


## Properties

Name | Type
------------ | -------------
`section` | string
`row` | string
`seat` | string
`allocation` | { [key: string]: any; }

## Example

```typescript
import type { TicketSeating } from '@maytes/api-client-ts'

// TODO: Update the object below with actual values
const example = {
  "section": null,
  "row": null,
  "seat": null,
  "allocation": null,
} satisfies TicketSeating

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as TicketSeating
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


