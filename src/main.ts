import 'https://deno.land/std@0.127.0/dotenv/load.ts';
import { Twilio } from './Twilio.ts';

const accountSid: string | undefined = Deno.env.get('TWILIO_ACCOUNT_SID');
const authToken: string | undefined = Deno.env.get('TWILIO_AUTH_TOKEN');
const phoneNumber: string | undefined = Deno.env.get('TWILIO_PHONE_NUMBER');
const callbackUrl: string | undefined = Deno.env.get('TWILIO_CALLBACK_URL');

console.log(Deno.env.get('APPLICATION_NAME'));
console.log(`accountSid: ${accountSid}, authToken: ${authToken}`);

const receiverNo = '+821076717395';
const message = 'Hello World!';

if (accountSid && authToken && phoneNumber && callbackUrl && receiverNo && message) {
	const twilio = new Twilio(
		accountSid,
		authToken,
		callbackUrl,
		phoneNumber,
	);

	twilio.sendMessage(receiverNo, message);
}
