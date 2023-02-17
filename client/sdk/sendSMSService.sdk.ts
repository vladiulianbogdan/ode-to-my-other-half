/**
* This is an auto generated code. This code should not be modified since the file can be overwriten 
* if new genezio commands are executed.
*/
     
import { Remote } from "./remote"



export class SendSMSService {
    static remote = new Remote("http://127.0.0.1:8083/SendSMSService")

    static async sendTestMessage(): Promise<any> {
        return await SendSMSService.remote.call("SendSMSService.sendTestMessage")  
  }

  static async test(): Promise<any> {
        return await SendSMSService.remote.call("SendSMSService.test")  
  }

  

}

export { Remote };
