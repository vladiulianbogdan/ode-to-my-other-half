/**
* This is an auto generated code. This code should not be modified since the file can be overwriten 
* if new genezio commands are executed.
*/
     
import { Remote } from "./remote"



export class PoemPreview {
    static remote = new Remote("http://127.0.0.1:8083/PoemPreview")

    static async generatePoemPreview(userId: string, token: string): Promise<any> {
        return await PoemPreview.remote.call("PoemPreview.generatePoemPreview", userId, token)  
  }

  

}

export { Remote };
