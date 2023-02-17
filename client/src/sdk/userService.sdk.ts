/**
* This is an auto generated code. This code should not be modified since the file can be overwriten 
* if new genezio commands are executed.
*/
     
import { Remote } from "./remote"

export type UserSettings = {
    phone?: string | undefined,
    poemSettings?: {
        poemAdjective?: string | undefined,
        words: string[],
    },
    hour?: number | undefined,
};

export type User = {
    _id: string,
    name: string,
    email: string,
    settings: UserSettings,
    poems: string[],
};

export enum AuthResultStatus {
    Ok = "Ok",
    Fail = "Fail"
};

export type AuthResult = {
    status: AuthResultStatus,
    token?: string,
    user?: User,
    message?: string,
};



export class UserService {
    static remote = new Remote("http://127.0.0.1:8083/UserService")

    static async register(name: string, email: string, password: string): Promise<AuthResult> {
        return await UserService.remote.call("UserService.register", name, email, password)  
  }

  static async login(email: string, password: string): Promise<AuthResult> {
        return await UserService.remote.call("UserService.login", email, password)  
  }

  static async checkSession(token: string): Promise<AuthResult> {
        return await UserService.remote.call("UserService.checkSession", token)  
  }

  static async setPreferences(userId: string, poemAdjective: string, words: string[], hour: number, phone: string): Promise<AuthResult> {
        return await UserService.remote.call("UserService.setPreferences", userId, poemAdjective, words, hour, phone)  
  }

  static async getPreferences(userId: string): Promise<UserSettings | AuthResult> {
        return await UserService.remote.call("UserService.getPreferences", userId)  
  }

  static async addPoem(userId: string, poem: string): Promise<AuthResult> {
        return await UserService.remote.call("UserService.addPoem", userId, poem)  
  }

  static async getPoems(userId: string): Promise<string[] | AuthResult> {
        return await UserService.remote.call("UserService.getPoems", userId)  
  }

  

}

export { Remote };
