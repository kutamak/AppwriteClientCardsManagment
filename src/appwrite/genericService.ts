import conf from "@/conf/config";
import appwriteService, { databases } from "./config"
import { ID, Models, Permission, Role } from "appwrite";
import { TypeGivenServiceFull, TypeGivenService, TypeClubFull, ApiResponse, ApiService } from "@/globals/globalTypes";
import { getIdsFromDocument } from "@/globals/functions";


export class genericSerivce {
	currentUser: Models.User<Models.Preferences> | null = null;
  // collectionId!: "";

	async validateUser():Promise<boolean> {
		this.currentUser = await appwriteService.getCurrentUser()
		return !!this.currentUser;
	}

	getAllPermissionsForUserId(userId:string):string[]{
		if(!userId){
			return [];
		}
		return [
			Permission.read(Role.user(userId)),
			Permission.update(Role.user(userId)),
			Permission.delete(Role.user(userId)),
		]
	}
}
