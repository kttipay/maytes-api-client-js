
# OAuthTokenRequest


## Properties

Name | Type
------------ | -------------
`grantType` | string
`clientId` | string
`clientSecret` | string
`username` | string
`password` | string
`refreshToken` | string
`scope` | string

## Example

```typescript
import type { OAuthTokenRequest } from '@maytes/api-client-ts'

// TODO: Update the object below with actual values
const example = {
  "grantType": null,
  "clientId": null,
  "clientSecret": null,
  "username": null,
  "password": null,
  "refreshToken": null,
  "scope": null,
} satisfies OAuthTokenRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as OAuthTokenRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


