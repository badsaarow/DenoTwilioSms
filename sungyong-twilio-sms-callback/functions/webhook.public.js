
const verifyWebhook = () => {
  // Initialize a new SendGrid EventWebhook to expose helpful request
  // validation methods

  // POST [callbackUrl]
  // Smartsheet-Hook-Challenge: d78dd1d3-01ce-4481-81de-92b4f3aa5ab1 
  // { 
  //   "challenge": "d78dd1d3-01ce-4481-81de-92b4f3aa5ab1",
  //   "webhookId": 2674017481058180
  // }
  // Verification response (by subscriber):
  
  // HTTP status: 200 OK
  // Smartsheet-Hook-Response: d78dd1d3-01ce-4481-81de-92b4f3aa5ab1 
  // {
  //   "smartsheetHookResponse": "d78dd1d3-01ce-4481-81de-92b4f3aa5ab1"
  // }

};

// Update Event
// {
//   "objectType": "sheet",
//   "eventType": "updated",
//   "id": 4509506114742148,
//   "userId": 9007194052434043,
//   "timestamp": "2015-10-27T17:03:15.000+0000"
// },
exports.handler = async (context, event, callback) => {
  console.debug({context, event, callback});

  // if header has Smartsheet-Hook-Challenge

  // Verify the request using the public key, the body of the request,
  // and the SendGrid headers
  // const valid = verifyWebhook(publicKey, rawEvent, signature, timestamp);
  // Reject invalidated requests!
  // if (!valid) return callback("Request didn't come from SendGrid", event);

  // Helper method to simplify repeated calls to send messages with
  // nicely formatted timestamps
  // const sendSMSNotification = (recipientEmail, timestamp) => {
  //   const formattedDateTime = new Intl.DateTimeFormat('en-US', {
  //     year: 'numeric',
  //     month: 'numeric',
  //     day: 'numeric',
  //     hour: 'numeric',
  //     minute: 'numeric',
  //     second: 'numeric',
  //     hour12: true,
  //     timeZone: 'America/Los_Angeles',
  //   }).format(timestamp);

  //   return twilioClient.messages.create({
  //     from: twilioPhoneNumber,
  //     to: numberToNotify,
  //     body: `Email to ${recipientEmail} was opened on ${formattedDateTime}.`,
  //   });
  // };

  // // Access a pre-initialized Twilio client from context
  // const twilioClient = context.getTwilioClient();

  // const twilioPhoneNumber = context.TWILIO_PHONE_NUMBER;
  // const numberToNotify = context.NOTIFY_PHONE_NUMBER;

  
  // // Runtime injects the request object and spreads in the SendGrid events.
  // // Isolate the original SendGrid event contents using destructuring
  // // and the rest operator
  // const { request, ...sendGridEvents } = event;
  // // Convert the SendGrid event back into an array of events, which is the
  // // format sent by SendGrid initially
  // const sendGridPayload = Object.values(sendGridEvents);

  // // Stringify the event and add newlines/carriage returns since they're expected by validator
  // const rawEvent =
  //   JSON.stringify(sendGridPayload).split('},{').join('},\r\n{') + '\r\n';


  // Return a 200 OK!
  return callback();
};
