/**
* This is an auto generated code. This code should not be modified since the file can be overwriten 
* if new genezio commands are executed.
*/
     
import { Remote } from "./remote"



export class SendSMSService {
    static remote = new Remote("http://127.0.0.1:8083/SendSMSService")

    static async sendTestMessage(message: string, to: string): Promise<string> {
        return await SendSMSService.remote.call("SendSMSService.sendTestMessage", message, to)  
  }

  

}

export { Remote };
