import conf from "@/conf/config";
import appwriteService, { databases } from "./config"
import { ID, Models, Permission, Role } from "appwrite";
import { TypeGivenServiceFull, TypeGivenService, TypeClubFull, ApiResponse, ApiService } from "@/globals/globalTypes";
import { getIdsFromDocument } from "@/globals/functions";
import { genericSerivce } from "./genericService";


// const this.collectionId = "givenServices";


class GivenServicesService extends genericSerivce implements ApiService<TypeGivenServiceFull> {
	readonly collectionId = process.env.NEXT_PUBLIC_APPWRITE_TABLE_GIVEN_SERVICES || "";
	currentUser: Models.User<Models.Preferences> | null = null;

	async validateUser():Promise<boolean> {
		this.currentUser = await appwriteService.getCurrentUser()
		return !!this.currentUser;
	}

  async getList():Promise<ApiResponse<TypeGivenServiceFull>> {
    if(await this.validateUser()){
      const ans:ApiResponse<TypeGivenServiceFull> = await databases.listDocuments(
        conf.appwriteDatabaseId,
			  this.collectionId, 
      );
      return ans;
    }else{
      throw new Error("User not connected")
    }
  }

  async create(givenServices:TypeGivenService):Promise<TypeGivenServiceFull>{
    if(await this.validateUser()){
      const givenServiceRes = await databases.createDocument<TypeGivenServiceFull>(conf.appwriteDatabaseId,
        this.collectionId,ID.unique(), {
					title: givenServices.title,
					description: givenServices.description,
					cardTypes: getIdsFromDocument(givenServices.cardTypes)
				},[
            Permission.read(Role.user(<string>this.currentUser?.$id)),
            Permission.update(Role.user(<string>this.currentUser?.$id)),
            Permission.delete(Role.user(<string>this.currentUser?.$id)),
          ])
        return givenServiceRes;
    }else{
      throw new Error("User not connected")
    }
  }


	async update(recordId: string, givenService: TypeGivenService) {
		if (await this.validateUser()) {
			const updatedRecord = await databases.updateDocument<TypeGivenServiceFull>(
				conf.appwriteDatabaseId,
				this.collectionId,
				recordId,
				{
					title: givenService.title,
					description: givenService.description,
					cardTypes: givenService.cardTypes
				}
				
			);

			return updatedRecord;
			// return ans
		} else {
			throw new Error("User not connected")
		}
	}
	async delete(recordId:string){
		if (await this.validateUser()) {
			const currentClub = await databases.deleteDocument(conf.appwriteDatabaseId,
				this.collectionId,recordId)
			return currentClub;
		}else{
			throw new Error("User not connected")
		}
	}
}

const givenServicesService = new GivenServicesService()

export default givenServicesService;