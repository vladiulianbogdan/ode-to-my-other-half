import { UserModel } from "../models/user";
import { OpenAIAssistant } from "../services/openAiAssistant";
import { SendMessageService } from "../services/sendSmsService";
import { UserService } from "./users";
import mongoose from "mongoose";
import { MONGO_DB_URI } from "../helper";

export class SendMessageCron {
    constructor() {
        mongoose.connect(MONGO_DB_URI);
    }
    async sendMessage() {
        const openAIAssistant = new OpenAIAssistant();
        const sendMessageService = new SendMessageService();
        const users = await UserModel.find();
        const promises: Promise<any>[] = [];
        for (const user of users) {
            if (user.settings) {
                const hour = new Date().getHours();
                if (hour == user.settings.hour) {
                    console.log(`DEBUG: Send message to user ${user.name}`);
                    const request = "Write a " + user.settings?.poemSettings?.poemAdjective + " poem about  " + user.settings?.poemSettings?.words.join(",") + " for my partener" + ".\n";
                    const response = openAIAssistant.askChatGPT(request).then(async (response) => {
                        if (response) {
                            sendMessageService.sendTestMessage(response, user.settings?.phone);
                            const userService = new UserService();
                            await userService.addPoem(user._id.toString(), response);
                        }
                    });
                    promises.push(response);
                }
            }
        }
        await Promise.all(promises);
    }
}
