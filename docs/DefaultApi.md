# DefaultApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**cancelCheckout**](DefaultApi.md#cancelcheckoutoperation) | **POST** /api/merchant/v1/checkouts/{checkoutUuid}/cancel | Cancel authorized checkout |
| [**captureCheckout**](DefaultApi.md#capturecheckoutoperation) | **POST** /api/merchant/v1/checkouts/{checkoutUuid}/capture | Capture authorized checkout |
| [**createCheckout**](DefaultApi.md#createcheckoutoperation) | **POST** /api/merchant/v1/checkouts | Create a new checkout |
| [**getCheckout**](DefaultApi.md#getcheckout) | **GET** /api/merchant/v1/checkouts/{checkoutUuid} | Get checkout details |
| [**getHealth**](DefaultApi.md#gethealth) | **GET** /api/health | Health check |
| [**getOAuthToken**](DefaultApi.md#getoauthtoken) | **POST** /oauth/token | Issue an access token |
| [**getSettlement**](DefaultApi.md#getsettlement) | **GET** /api/merchant/v1/settlements/{uuid} | Get a settlement by UUID |
| [**listSettlements**](DefaultApi.md#listsettlements) | **GET** /api/merchant/v1/settlements | List settlements for this merchant |
| [**refundCheckout**](DefaultApi.md#refundcheckout) | **POST** /api/merchant/v1/checkouts/{checkoutUuid}/refund | Refund a captured checkout |



## cancelCheckout

> CancelCheckoutResponse cancelCheckout(checkoutUuid, cancelCheckoutRequest)

Cancel authorized checkout

### Example

```ts
import {
  Configuration,
  DefaultApi,
} from '@maytes/api-client-ts';
import type { CancelCheckoutOperationRequest } from '@maytes/api-client-ts';

async function example() {
  console.log("🚀 Testing @maytes/api-client-ts SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new DefaultApi(config);

  const body = {
    // string
    checkoutUuid: checkoutUuid_example,
    // CancelCheckoutRequest
    cancelCheckoutRequest: ...,
  } satisfies CancelCheckoutOperationRequest;

  try {
    const data = await api.cancelCheckout(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **checkoutUuid** | `string` |  | [Defaults to `undefined`] |
| **cancelCheckoutRequest** | [CancelCheckoutRequest](CancelCheckoutRequest.md) |  | |

### Return type

[**CancelCheckoutResponse**](CancelCheckoutResponse.md)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |
| **401** |  |  -  |
| **404** |  |  -  |
| **409** |  |  -  |
| **422** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## captureCheckout

> CaptureCheckoutResponse captureCheckout(checkoutUuid, captureCheckoutRequest)

Capture authorized checkout

### Example

```ts
import {
  Configuration,
  DefaultApi,
} from '@maytes/api-client-ts';
import type { CaptureCheckoutOperationRequest } from '@maytes/api-client-ts';

async function example() {
  console.log("🚀 Testing @maytes/api-client-ts SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new DefaultApi(config);

  const body = {
    // string
    checkoutUuid: checkoutUuid_example,
    // CaptureCheckoutRequest
    captureCheckoutRequest: ...,
  } satisfies CaptureCheckoutOperationRequest;

  try {
    const data = await api.captureCheckout(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **checkoutUuid** | `string` |  | [Defaults to `undefined`] |
| **captureCheckoutRequest** | [CaptureCheckoutRequest](CaptureCheckoutRequest.md) |  | |

### Return type

[**CaptureCheckoutResponse**](CaptureCheckoutResponse.md)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |
| **401** |  |  -  |
| **404** |  |  -  |
| **409** |  |  -  |
| **422** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## createCheckout

> CreateCheckoutResponse createCheckout(createCheckoutRequest)

Create a new checkout

### Example

```ts
import {
  Configuration,
  DefaultApi,
} from '@maytes/api-client-ts';
import type { CreateCheckoutOperationRequest } from '@maytes/api-client-ts';

async function example() {
  console.log("🚀 Testing @maytes/api-client-ts SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new DefaultApi(config);

  const body = {
    // CreateCheckoutRequest
    createCheckoutRequest: ...,
  } satisfies CreateCheckoutOperationRequest;

  try {
    const data = await api.createCheckout(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **createCheckoutRequest** | [CreateCheckoutRequest](CreateCheckoutRequest.md) |  | |

### Return type

[**CreateCheckoutResponse**](CreateCheckoutResponse.md)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |
| **401** |  |  -  |
| **409** |  |  -  |
| **422** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getCheckout

> GetCheckoutResponse getCheckout(checkoutUuid, merchantOrderId)

Get checkout details

### Example

```ts
import {
  Configuration,
  DefaultApi,
} from '@maytes/api-client-ts';
import type { GetCheckoutRequest } from '@maytes/api-client-ts';

async function example() {
  console.log("🚀 Testing @maytes/api-client-ts SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new DefaultApi(config);

  const body = {
    // string
    checkoutUuid: checkoutUuid_example,
    // string (optional)
    merchantOrderId: merchantOrderId_example,
  } satisfies GetCheckoutRequest;

  try {
    const data = await api.getCheckout(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **checkoutUuid** | `string` |  | [Defaults to `undefined`] |
| **merchantOrderId** | `string` |  | [Optional] [Defaults to `undefined`] |

### Return type

[**GetCheckoutResponse**](GetCheckoutResponse.md)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |
| **401** |  |  -  |
| **404** |  |  -  |
| **422** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getHealth

> HealthResponse getHealth()

Health check

### Example

```ts
import {
  Configuration,
  DefaultApi,
} from '@maytes/api-client-ts';
import type { GetHealthRequest } from '@maytes/api-client-ts';

async function example() {
  console.log("🚀 Testing @maytes/api-client-ts SDK...");
  const api = new DefaultApi();

  try {
    const data = await api.getHealth();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**HealthResponse**](HealthResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getOAuthToken

> OAuthTokenResponse getOAuthToken(oAuthTokenRequest)

Issue an access token

### Example

```ts
import {
  Configuration,
  DefaultApi,
} from '@maytes/api-client-ts';
import type { GetOAuthTokenRequest } from '@maytes/api-client-ts';

async function example() {
  console.log("🚀 Testing @maytes/api-client-ts SDK...");
  const api = new DefaultApi();

  const body = {
    // OAuthTokenRequest
    oAuthTokenRequest: ...,
  } satisfies GetOAuthTokenRequest;

  try {
    const data = await api.getOAuthToken(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **oAuthTokenRequest** | [OAuthTokenRequest](OAuthTokenRequest.md) |  | |

### Return type

[**OAuthTokenResponse**](OAuthTokenResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |
| **400** | Invalid grant or request |  -  |
| **401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getSettlement

> GetSettlementResponse getSettlement(uuid)

Get a settlement by UUID

### Example

```ts
import {
  Configuration,
  DefaultApi,
} from '@maytes/api-client-ts';
import type { GetSettlementRequest } from '@maytes/api-client-ts';

async function example() {
  console.log("🚀 Testing @maytes/api-client-ts SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new DefaultApi(config);

  const body = {
    // string | Settlement UUID
    uuid: uuid_example,
  } satisfies GetSettlementRequest;

  try {
    const data = await api.getSettlement(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **uuid** | `string` | Settlement UUID | [Defaults to `undefined`] |

### Return type

[**GetSettlementResponse**](GetSettlementResponse.md)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |
| **401** |  |  -  |
| **404** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## listSettlements

> ListSettlementsResponse listSettlements(offset, limit, sortDir, sortBy, createdBefore, createdAfter, status)

List settlements for this merchant

Returns settlements for the authenticated merchant. Default sort: created_at ASC.

### Example

```ts
import {
  Configuration,
  DefaultApi,
} from '@maytes/api-client-ts';
import type { ListSettlementsRequest } from '@maytes/api-client-ts';

async function example() {
  console.log("🚀 Testing @maytes/api-client-ts SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new DefaultApi(config);

  const body = {
    // any | Pagination offset (default 0) (optional)
    offset: ...,
    // any | Max records to return (default 50, max 200) (optional)
    limit: ...,
    // 'asc' | 'desc' | Sort direction (default: asc) (optional)
    sortDir: sortDir_example,
    // 'created_at' | 'period_to' | 'settled_amount' | Field to sort by (default: created_at) (optional)
    sortBy: sortBy_example,
    // any | Include settlements created at or before this ISO-8601 timestamp (optional)
    createdBefore: ...,
    // any | Include settlements created at or after this ISO-8601 timestamp (optional)
    createdAfter: ...,
    // 'CREATED' | 'PENDING' | 'COMPLETED' | 'FAILED' | 'NEEDS_REVIEW' | 'CANCELLED' | Filter by status (optional)
    status: status_example,
  } satisfies ListSettlementsRequest;

  try {
    const data = await api.listSettlements(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **offset** | `any` | Pagination offset (default 0) | [Optional] [Defaults to `undefined`] |
| **limit** | `any` | Max records to return (default 50, max 200) | [Optional] [Defaults to `undefined`] |
| **sortDir** | `asc`, `desc` | Sort direction (default: asc) | [Optional] [Defaults to `undefined`] [Enum: asc, desc] |
| **sortBy** | `created_at`, `period_to`, `settled_amount` | Field to sort by (default: created_at) | [Optional] [Defaults to `undefined`] [Enum: created_at, period_to, settled_amount] |
| **createdBefore** | `any` | Include settlements created at or before this ISO-8601 timestamp | [Optional] [Defaults to `undefined`] |
| **createdAfter** | `any` | Include settlements created at or after this ISO-8601 timestamp | [Optional] [Defaults to `undefined`] |
| **status** | `CREATED`, `PENDING`, `COMPLETED`, `FAILED`, `NEEDS_REVIEW`, `CANCELLED` | Filter by status | [Optional] [Defaults to `undefined`] [Enum: CREATED, PENDING, COMPLETED, FAILED, NEEDS_REVIEW, CANCELLED] |

### Return type

[**ListSettlementsResponse**](ListSettlementsResponse.md)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |
| **401** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## refundCheckout

> refundCheckout(checkoutUuid, createRefundRequest)

Refund a captured checkout

Initiates a full refund of the captured payment. Returns 204 immediately; Stripe confirms asynchronously via webhook. Poll GET /checkouts/:uuid for status and refund details.

### Example

```ts
import {
  Configuration,
  DefaultApi,
} from '@maytes/api-client-ts';
import type { RefundCheckoutRequest } from '@maytes/api-client-ts';

async function example() {
  console.log("🚀 Testing @maytes/api-client-ts SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new DefaultApi(config);

  const body = {
    // string
    checkoutUuid: checkoutUuid_example,
    // CreateRefundRequest
    createRefundRequest: ...,
  } satisfies RefundCheckoutRequest;

  try {
    const data = await api.refundCheckout(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **checkoutUuid** | `string` |  | [Defaults to `undefined`] |
| **createRefundRequest** | [CreateRefundRequest](CreateRefundRequest.md) |  | |

### Return type

`void` (Empty response body)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **204** |  |  -  |
| **401** |  |  -  |
| **402** |  |  -  |
| **404** |  |  -  |
| **409** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

