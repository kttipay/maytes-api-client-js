
# TicketCustomData


## Properties

Name | Type
------------ | -------------
`eventId` | string
`eventStartAt` | Date
`timezone` | string
`ticketClass` | string
`name` | string
`eventEndAt` | Date
`deliveryMode` | string
`venueName` | string
`venueAddress` | { [key: string]: any; }
`seating` | [TicketSeating](TicketSeating.md)
`termsUrl` | string
`attendeeRequired` | boolean

## Example

```typescript
import type { TicketCustomData } from '@maytes/api-client-ts'

// TODO: Update the object below with actual values
const example = {
  "eventId": null,
  "eventStartAt": null,
  "timezone": null,
  "ticketClass": null,
  "name": null,
  "eventEndAt": null,
  "deliveryMode": null,
  "venueName": null,
  "venueAddress": null,
  "seating": null,
  "termsUrl": null,
  "attendeeRequired": null,
} satisfies TicketCustomData

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as TicketCustomData
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


