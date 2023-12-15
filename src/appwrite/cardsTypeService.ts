import conf from "@/conf/config";
import appwriteService, { databases } from "./config"
import { ID, Models, Permission, Query, Role } from "appwrite";
import { ApiResponse, ApiService, LoginUserAccount, TypeClub, TypeClubFull } from "@/globals/globalTypes";
import { genericSerivce } from "./genericService";

// const this.collectionId = "6554ade0f37d46b1e2d9";

// interface ApiResponse extends Models.DocumentList<TypeClubFull>{

// }

class CardTypesService extends genericSerivce implements ApiService<TypeClubFull> {
	readonly collectionId = process.env.NEXT_PUBLIC_APPWRITE_TABLE_CARD_TYPES || "";
	currentUser: Models.User<Models.Preferences> | null = null;

	async validateUser() {
		this.currentUser = await appwriteService.getCurrentUser()
		return !!this.currentUser;
	}

	async getList<T>():Promise<ApiResponse<TypeClubFull>> {
		if (await this.validateUser()) {
			const ans:ApiResponse<TypeClubFull> = await databases.listDocuments(
				conf.appwriteDatabaseId,
				this.collectionId,
			);
			return ans
		} else {
			throw new Error("User not connected")
		}
	}

	async create(club:TypeClub) {
		if (await this.validateUser()) {
			const currentClub = await databases.createDocument<TypeClubFull>(conf.appwriteDatabaseId,
				this.collectionId,ID.unique(), {
					...club,
					owner: this.currentUser?.$id // This is for me - to check permissions myself!
				},[
					Permission.read(Role.user(<string>this.currentUser?.$id)),
					Permission.update(Role.user(<string>this.currentUser?.$id)),
					Permission.delete(Role.user(<string>this.currentUser?.$id)),
				])
			return currentClub;
		}else{
			throw new Error("User not connected")
		}
	}

	async update(clubId: string, club: TypeClub) {
		if (await this.validateUser()) {
			const updatedClub = await databases.updateDocument<TypeClubFull>(
				conf.appwriteDatabaseId,
				this.collectionId,
				clubId,
				{
					title: club.title,
					description: club.description,
					joinPrice: club.joinPrice,
					usageCountLimit: club.usageCountLimit,
				}
			);
			return updatedClub;
			// return ans
		} else {
			throw new Error("User not connected")
		}
	}
	async delete(clubId:string){
		if (await this.validateUser()) {
			const currentClub = await databases.deleteDocument(conf.appwriteDatabaseId,
				this.collectionId,clubId)
			return currentClub;
		}else{
			throw new Error("User not connected")
		}
	}
}

const cardTypesService = new CardTypesService()

export default cardTypesService;