export class Twilio {
	protected HOST_NAME = 'https://api.twilio.com';
	protected HOST_PATH = '/2010-04-01/Accounts';
	protected BASE_URL = `${this.HOST_NAME}${this.HOST_PATH}`;

	constructor(
		private readonly accountSID: string,
		private readonly authToken: string,
		private readonly serviceSID: string,
		private readonly phoneNumber: string,
	) {
	}

	sendMessage(to: string, message: string) {
		return this.doRawRequest(to, message);
	}

	// 	curl -X POST https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Messages.json \
	// --data-urlencode "Body=McAvoy or Stewart? These timelines can get so confusing." \
	// --data-urlencode "From=+15017122661" \
	// --data-urlencode "StatusCallback=http://postb.in/1234abcd" \
	// --data-urlencode "To=+15558675310" \
	// -u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN

	async doRawRequest(to: string, message: string) {
		try {
			const response = await fetch(
				`${this.BASE_URL}/${this.accountSID}/Messages.json`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'Authorization': `Basic ${
							btoa(`${this.accountSID}:${this.authToken}`)
						}`,
					},
					body: new URLSearchParams({
						To: to,
						From: this.phoneNumber,
						StatusCallback: 'http://postb.in/1234abcd',
						Body: message,
					}),
				},
			);
			if (!response.ok) {
				throw new Error(
					`Network response was not ok ${response.status} ${response.statusText}`,
				);
			}
			return response.json();
		} catch (error) {
			console.error(
				`There has been a problem with your fetch operations: ${error}`,
			);
		}
	}
}
