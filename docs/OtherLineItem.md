
# OtherLineItem


## Properties

Name | Type
------------ | -------------
`itemRef` | string
`parentRef` | string
`sku` | string
`name` | string
`description` | string
`imageUrl` | string
`quantity` | number
`unitPrice` | number
`currency` | string
`category` | string

## Example

```typescript
import type { OtherLineItem } from '@maytes/api-client-ts'

// TODO: Update the object below with actual values
const example = {
  "itemRef": null,
  "parentRef": null,
  "sku": null,
  "name": null,
  "description": null,
  "imageUrl": null,
  "quantity": null,
  "unitPrice": null,
  "currency": null,
  "category": null,
} satisfies OtherLineItem

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as OtherLineItem
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


