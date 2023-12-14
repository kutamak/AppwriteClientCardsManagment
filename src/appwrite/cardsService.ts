import conf from "@/conf/config";
import appwriteService, { account, databases } from "./config"
import { ID, Models, Permission, Query, Role } from "appwrite";
import { ApiResponse, ApiService, TypeCardFull, TypeClient, CreateUserAccount, TypeCard, extraQueryParams } from "@/globals/globalTypes";
import { genericSerivce } from "./genericService";
import { getQueriesFromParams } from "@/globals/functions";


class CardService extends genericSerivce implements ApiService<TypeCardFull> {
  readonly collectionId = process.env.NEXT_PUBLIC_APPWRITE_TABLE_CARDS || "";
	currentUser: Models.User<Models.Preferences> | null = null;

	async validateUser() {
		this.currentUser = await appwriteService.getCurrentUser()
		return !!this.currentUser;
	}

	
	async getList(params?:extraQueryParams):Promise<ApiResponse<TypeCardFull>> {
		const paramsObj = params || {};
		if (await this.validateUser()) {
			const ans:ApiResponse<TypeCardFull> = await databases.listDocuments(
				conf.appwriteDatabaseId,
				this.collectionId, getQueriesFromParams({...paramsObj, is_deleted: false})
			);
			return ans
		} else {
			throw new Error("User not connected")
		}
	}
	
	async getSingle(cardId: string):Promise<any> {
		if (await this.validateUser()) {
			const ans = await databases.getDocument(
				conf.appwriteDatabaseId,
				this.collectionId,
				cardId
			);
			return ans
		} else {
			throw new Error("User not connected")
		}
	}

	async incrementTimesUsed(cardId: string, newEntryCount: number):Promise<any> {
	// TODO: get the entry, and increment it.
		if (await this.validateUser()) {
			const ans = await databases.updateDocument(
				conf.appwriteDatabaseId,
				this.collectionId,
				cardId,
				{
					times_used: newEntryCount
				}
			);
			return ans
		} else {
			throw new Error("User not connected")
		}
	}

	// async createCard({email, password,name}:CreateUserAccount):Promise<string> {
	// 		try {
	// 				const userAccount = await account.create(ID.unique(), email,password, name);
	// 				console.log("CREATED NEW USER:", userAccount)
	// 				return userAccount.$id;
	// 		} catch (error:any) {
	// 				throw error
	// 		}
	// }


	async create(card:TypeCard) {
		if (await this.validateUser()) {

			const myPermissions = this.getAllPermissionsForUserId(<string>this.currentUser?.$id);
			const currentCard = await databases.createDocument<TypeCardFull>(conf.appwriteDatabaseId,
				this.collectionId,ID.unique(), {
					is_active: card.is_active,
					times_used: card.times_used,
					user2cards: card.user2cards,
					card_type: card.card_type,
					expires_date: card.expires_date
				},myPermissions)
			return currentCard;
		}else{
			throw new Error("User not connected")
		}
	}

	async update(cardId: string, card: TypeCard) {
		if (await this.validateUser()) {
			const updatedClub = await databases.updateDocument<TypeCardFull>(
				conf.appwriteDatabaseId,
				this.collectionId,
				cardId,
				{
					is_active: card.is_active,
					times_used: card.times_used,
					user2cards: card.user2cards,
					card_type: card.card_type,
					expires_date: card.expires_date
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
			const currentCard = await databases.updateDocument<TypeCardFull>(
				conf.appwriteDatabaseId,
				this.collectionId,
				clientId,
				{
					is_deleted: true,
				}
			);
			return currentCard;
		}else{
			throw new Error("User not connected")
		}
	}

}

const myCardService = new CardService();

export default myCardService;