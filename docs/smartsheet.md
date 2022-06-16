# smartsheet

## event callback type

## CallbackEvent Object

**id**numberId of the object that corresponds to **objectType**. Omitted if **objectType** is **cell**.

**columnId**numberOnly present if **objectType** is **cell**. The Id of the column where the cell is located.

**rowId**numberOnly present if **objectType** is **cell**. The Id of the row where the cell is located.

**userId**numberThe user Id of the person who caused this event.

**objectType**stringType of object for which event occurred. One of the following values:

* **attachment**
* **cell**
* **column**
* **comment**
* **discussion**
* **row**
* **sheet**

**changeAgent**stringA comma-delimited list of values that uniquely identify the agents responsible for making the changes that caused the callback to occur. Only present if the change agent included the **Smartsheet-Change-Agent** header in the API request that changed data in Smartsheet. For more information, see [Preventing Infinite Loops](https://smartsheet-platform.github.io/api-docs/?shell#preventing-infinite-loops).

**eventType**stringType of event that occurred. One of the following values: **created**, **deleted**, **updated**

**timestamp**timestampTime that this event occurred. A callback may contain events with different timestamps, as multiple separate events may be aggregated into a single callback request.


## Webhook Setting

```
POST https://api.smartsheet.com/2.0/webhooks
Authorization: Bearer wX35B9BE2oGUKQt28YDOsy7FGC9AcWXdb5SuM
Content-Type: application/json

{
  "name": "Send SMS",
  "callbackUrl": "https://sungyong-twilio-sms-callback-4698-dev.twil.io/webhook",
  "scope": "sheet",
  "scopeObjectId": "6158310178088836",
  "events": [
    "*.*"
  ],
  "version": 1,
  "subscope": {
    "columnIds": [
    ]
  }
}
```

```
{
  "message": "SUCCESS",
  "resultCode": 0,
  "result": {
    "id": 5836227082512260,
    "name": "Send SMS",
    "scope": "sheet",
    "scopeObjectId": 6158310178088836,
    "subscope": {
      "columnIds": []
    },
    "events": [
      "*.*"
    ],
    "callbackUrl": "https://sungyong-twilio-sms-callback-4698-dev.twil.io/webhook",
    "sharedSecret": "6kxa0o9m2yan3uy7dly4o7dsn4",
    "enabled": false,
    "status": "NEW_NOT_VERIFIED",
    "version": 1,
    "createdAt": "2022-06-16T09:26:44Z",
    "modifiedAt": "2022-06-16T09:26:44Z"
  }
}
```

## Enable webhook

```
PUT https://api.smartsheet.com/2.0/webhooks/5836227082512260
Authorization: Bearer wX35B9BE2oGUKQt28YDOsy7FGC9AcWXdb5SuM
Content-Type: application/json

{
  "enabled": true
}
```

```
{
  "message": "SUCCESS",
  "resultCode": 0,
  "result": {
    "id": 5836227082512260,
    "name": "Send SMS",
    "scope": "sheet",
    "scopeObjectId": 6158310178088836,
    "subscope": {
      "columnIds": []
    },
    "events": [
      "*.*"
    ],
    "callbackUrl": "https://sungyong-twilio-sms-callback-4698-dev.twil.io/webhook",
    "sharedSecret": "6kxa0o9m2yan3uy7dly4o7dsn4",
    "enabled": false,
    "status": "DISABLED_VERIFICATION_FAILED",
    "disabledDetails": "Request returned HTTP status code 500 (ref id: enk7r0)",
    "version": 1,
    "createdAt": "2022-06-16T09:26:44Z",
    "modifiedAt": "2022-06-16T09:29:55Z"
  }
}
```

## Webhook Callback 

```
POST [callbackUrl]
Smartsheet-Hook-Challenge: d78dd1d3-01ce-4481-81de-92b4f3aa5ab1 
{ 
  "challenge": "d78dd1d3-01ce-4481-81de-92b4f3aa5ab1",
  "webhookId": 2674017481058180
}
Verification response (by subscriber):

HTTP status: 200 OK
Smartsheet-Hook-Response: d78dd1d3-01ce-4481-81de-92b4f3aa5ab1 
{
  "smartsheetHookResponse": "d78dd1d3-01ce-4481-81de-92b4f3aa5ab1"
}
```

- real request
```
challenge=104ef667-3eba-40c8-8a6e-1ed58f3c90f3&webhookId=5836227082512260

```