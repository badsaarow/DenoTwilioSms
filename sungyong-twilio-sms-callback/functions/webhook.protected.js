const { EventWebhook, EventWebhookHeader } = require('@sendgrid/eventwebhook');

// Helper method for validating SendGrid requests
const verifyRequest = (publicKey, payload, signature, timestamp) => {
  // Initialize a new SendGrid EventWebhook to expose helpful request
  // validation methods
  const eventWebhook = new EventWebhook();
  // Convert the public key string into an ECPublicKey
  const ecPublicKey = eventWebhook.convertPublicKeyToECDSA(publicKey);
  return eventWebhook.verifySignature(
    ecPublicKey,
    payload,
    signature,
    timestamp
  );
};

exports.handler = async (context, event, callback) => {
  // Access a pre-initialized Twilio client from context
  const twilioClient = context.getTwilioClient();
  // Access sensitive values such as the sendgrid key and phone numbers
  // from Environment Variables
  const publicKey = context.SENDGRID_WEBHOOK_PUBLIC_KEY;
  const twilioPhoneNumber = context.TWILIO_PHONE_NUMBER;
  const numberToNotify = context.NOTIFY_PHONE_NUMBER;

  // The SendGrid EventWebhookHeader provides methods for getting
  // the necessary header names.
  // Remember to cast these header names to lowercase to access them correctly
  const signatureKey = EventWebhookHeader.SIGNATURE().toLowerCase();
  const timestampKey = EventWebhookHeader.TIMESTAMP().toLowerCase();

  // Retrieve SendGrid's headers so they can be used to validate
  // the request
  const signature = event.request.headers[signatureKey];
  const timestamp = event.request.headers[timestampKey];

  // Runtime injects the request object and spreads in the SendGrid events.
  // Isolate the original SendGrid event contents using destructuring
  // and the rest operator
  const { request, ...sendGridEvents } = event;
  // Convert the SendGrid event back into an array of events, which is the
  // format sent by SendGrid initially
  const sendGridPayload = Object.values(sendGridEvents);

  // Stringify the event and add newlines/carriage returns since they're expected by validator
  const rawEvent =
    JSON.stringify(sendGridPayload).split('},{').join('},\r\n{') + '\r\n';

  // Verify the request using the public key, the body of the request,
  // and the SendGrid headers
  const valid = verifyRequest(publicKey, rawEvent, signature, timestamp);
  // Reject invalidated requests!
  if (!valid) return callback("Request didn't come from SendGrid", event);

  // Helper method to simplify repeated calls to send messages with
  // nicely formatted timestamps
  const sendSMSNotification = (recipientEmail, timestamp) => {
    const formattedDateTime = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
      timeZone: 'America/Los_Angeles',
    }).format(timestamp);

    return twilioClient.messages.create({
      from: twilioPhoneNumber,
      to: numberToNotify,
      body: `Email to ${recipientEmail} was opened on ${formattedDateTime}.`,
    });
  };

  // Convert the original list of events into a condensed version for SMS
  const normalizedEvents = sendGridPayload
    .map((rawEvent) => ({
      to: rawEvent.email,
      timestamp: rawEvent.timestamp * 1000,
      status: rawEvent.event,
      messageId: rawEvent.sg_message_id.split('.')[0],
    }))
    // Ensure that events are sorted by time to ensure they're sent
    // in the correct order
    .sort((a, b) => a.timestamp - b.timestamp);

  // Iterate over each event and wait for a text to be sent before
  // processing the next event
  for (const event of normalizedEvents) {
    // You could also await an async operation to update your db records to
    // reflect the status change here
    // await db.updateEmailStatus(event.messageId, event.status, event.timestamp);
    if (event.status === 'open') {
      await sendSMSNotification(event.to, event.timestamp);
    }
  }

  // Return a 200 OK!
  return callback();
};
