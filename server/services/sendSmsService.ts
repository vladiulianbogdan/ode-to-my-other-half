export class SendSMSService {
	async sendTestMessage(message: string, to: string): Promise<string> {
        require('dotenv').config();
        const accountSid: string | undefined = process.env.TWILIO_ACCOUNT_SID;
        const authToken: string | undefined = process.env.TWILIO_AUTH_TOKEN;
        console.log(accountSid, authToken);

        const client: any = require('twilio')(accountSid, authToken);

        const msg = await client.messages.create({
            body: message,
            from: "whatsapp:+14155238886",
            to: "whatsapp:" + to
        });

        console.log(msg.sid);
        return "Message sent!";
    }
}
