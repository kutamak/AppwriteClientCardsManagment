import conf from "@/conf/config";
import appwriteService, { account, databases } from "./config"
import { ID, Models, Permission, Role } from "appwrite";
import { ApiResponse, ApiService, TypeClientFull, TypeClient, CreateUserAccount } from "@/globals/globalTypes";
import { genericSerivce } from "./genericService";


class ClientService extends genericSerivce implements ApiService<TypeClientFull> {
  readonly collectionId = process.env.NEXT_PUBLIC_APPWRITE_TABLE_CLIENTS || "";
	currentUser: Models.User<Models.Preferences> | null = null;

	async validateUser() {
		this.currentUser = await appwriteService.getCurrentUser()
		return !!this.currentUser;
	}

	async getList():Promise<ApiResponse<TypeClientFull>> {
		if (await this.validateUser()) {
			const ans:ApiResponse<TypeClientFull> = await databases.listDocuments(
				conf.appwriteDatabaseId,
				this.collectionId,
			);
			return ans
		} else {
			throw new Error("User not connected")
		}
	}

	async createClientAccount({email, password,name}:CreateUserAccount):Promise<string> {
			try {
					const userAccount = await account.create(ID.unique(), email,password, name);
					console.log("CREATED NEW USER:", userAccount)
					return userAccount.$id;
			} catch (error:any) {
					throw error
			}
	}


	async create(client:TypeClient) {
		if (await this.validateUser()) {

			const myPermissions = this.getAllPermissionsForUserId(<string>this.currentUser?.$id);
			// if(client.email){
			// 	// need to create the new user account
			// 	const userAccountId = await this.createClientAccount({email:client.email,password:ID.unique(), name: client.full_name})
			// 	console.log("userAccountId, ", userAccountId)
			// 	myPermissions.push(...this.getAllPermissionsForUserId(userAccountId));
			// }
			console.log("myPermissions, ", myPermissions)
			const currentClub = await databases.createDocument<TypeClientFull>(conf.appwriteDatabaseId,
				this.collectionId,ID.unique(), {
					email: client.email,
					full_name: client.full_name,
					phone_number: client.phone_number,
					more_info: client.more_info,
					is_deleted: false,
					// ...client,
					// owner: this.currentUser?.$id // This is for me - to check permissions myself!
				},myPermissions)
			return currentClub;
		}else{
			throw new Error("User not connected")
		}
	}

	async update(clientId: string, client: TypeClient) {
		if (await this.validateUser()) {
			const updatedClub = await databases.updateDocument<TypeClientFull>(
				conf.appwriteDatabaseId,
				this.collectionId,
				clientId,
				{
					email: client.email,
					full_name: client.full_name,
					phone_number: client.phone_number,
					more_info: client.more_info,
					is_deleted: false,
				}
			);
			return updatedClub;
			// return ans
		} else {
			throw new Error("User not connected")
		}
	}
	async delete(clientId:string){
		if (await this.validateUser()) {
			const currentClub = await databases.updateDocument<TypeClientFull>(
				conf.appwriteDatabaseId,
				this.collectionId,
				clientId,
				{
					is_deleted: true,
				}
			);
			return currentClub;
		}else{
			throw new Error("User not connected")
		}
	}

}

const myClientService = new ClientService();

export default myClientService;