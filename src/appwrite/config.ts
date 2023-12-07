import conf from "@/conf/config";
import { CreateUserAccount, LoginUserAccount } from "@/globals/globalTypes";
import {Client, Account, ID, Databases, Query} from 'appwrite'

const appwriteClient = new Client()

appwriteClient.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);

export const account = new Account(appwriteClient)

export const databases = new Databases(appwriteClient);

export class AppwriteService {
    //create a new record of user inside appwrite
    async createUserAccount({email, password, name}: CreateUserAccount) {
        try {
            const userAccount = await account.create(ID.unique(), email, password, name)
            if (userAccount) {
                return this.login({email, password})
            } else {
                return userAccount
            }    
        } catch (error:any) {
            throw error
        }
    }

    async login( { email, password }: LoginUserAccount) {
       try {
            return await account.createEmailSession(email, password)
       } catch (error:any) {
         throw error
       }
    }

    async isLoggedIn(): Promise<boolean> {
        try {
            const data = await this.getCurrentUser();
            return Boolean(data)
        } catch (error) {}

        return false
    }

    async getCurrentUser() {
        try {
            return account.get()
        } catch (error) {
            console.log("getcurrentUser error: " + error)
            
        }

        return null
    }

    async logout() {
        try {
            return await account.deleteSession("current")
        } catch (error) {
            console.log("logout error: " + error)
        }
    }
    async doSomething(){
        try{
            const isLoggedIn = await this.isLoggedIn();
            if(isLoggedIn){

                const currentUser = await this.getCurrentUser();
                const currentUserId = currentUser?.$id;
                const ans = await databases.listDocuments(
                    conf.appwriteDatabaseId, 
                    "6554ade0f37d46b1e2d9",[
                        Query.equal("owner", [<string>currentUserId])
                    ]
                );
                return ans
            }else{
                return [];
            }
        }catch(error){
            console.log("doSomething error: " + error)
        }
    }

    
}

const appwriteService = new AppwriteService()

export default appwriteService