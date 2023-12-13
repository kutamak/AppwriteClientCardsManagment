import { Models } from "appwrite";
import { Type } from "typescript";



interface ApiResponse<T> extends Models.DocumentList <(TypeGivenServiceFull | TypeClubFull | TypeClientFull | TypeCardFull)>{

}
interface ApiService <T>{
    readonly collectionId: string,
    currentUser: Models.User<Models.Preferences> | null,
    validateUser():Promise<boolean>,
    getList(params?: extraQueryParams): Promise<ApiResponse<(TypeGivenServiceFull | TypeClubFull)>>
    create(obj:T):Promise<T>
    update(recordId: string, givenService: T): Promise<T>
    delete(recordId:string): void;
}    

interface LoginUserAccount {
    email: string,
    password: string,
}

interface CreateUserAccount extends LoginUserAccount{
    name: string,
}

interface TypeClub {
    title: string | undefined;
    joinPrice: number| undefined;
    description: string| undefined;
    usageCountLimit: number | undefined;
}

interface TypeClubFull extends TypeClub, Models.Document {
    auth_id: string | null;
    isDeleted: Boolean | null;
}

interface TypeClient {
    // id: string;
    full_name: string;
    phone_number: string;
    email: string;
    more_info: string;
    is_deleted?: Boolean;
    card_type?: string;

}

interface TypeClientFull extends TypeClient, Models.Document {}

interface TypeCard {
    times_used: number;
    user2cards: string | TypeClientFull;
    card_type?: string | TypeClubFull;
    is_active?: Boolean;
    expires_date?: string | Date;

}

interface TypeCardFull extends TypeCard, Models.Document {}

interface TypeGivenService {
    title: string | undefined;
    description: string| undefined;
    // cardTypes: (TypeClubFull| string )[];
    cardTypes: (TypeClubFull )[];
}

interface TypeGivenServiceFull extends TypeGivenService, Models.Document{}


type extraQueryParams = {
	[key: string]: any,
    getOnlyActive?: boolean,
}

export type { 
    extraQueryParams,
    TypeCardFull,
    TypeCard,
    TypeClub,
    TypeClubFull, 
    TypeClient, 
    TypeClientFull, 
    CreateUserAccount, 
    LoginUserAccount, 
    TypeGivenService, 
    TypeGivenServiceFull,
    ApiService,
    ApiResponse
}