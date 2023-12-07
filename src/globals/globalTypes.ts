import { Models } from "appwrite";



interface ApiResponse<T> extends Models.DocumentList <TypeGivenServiceFull | TypeClubFull>{

}
interface ApiService <T>{
    readonly collectionId: string,
    currentUser: Models.User<Models.Preferences> | null,
    validateUser():Promise<boolean>,
    getList(): Promise<ApiResponse<TypeGivenServiceFull | TypeClubFull>>
    create(givenServices:T):Promise<T>
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

interface TypeClubFull extends TypeClub, Models.Document {}

interface TypeGivenService {
    title: string | undefined;
    description: string| undefined;
    // cardTypes: (TypeClubFull| string )[];
    cardTypes: (TypeClubFull )[];
}

interface TypeGivenServiceFull extends TypeGivenService, Models.Document{}



interface TypeClient {
    id: String;
    name: String;
    email: String;

}

export type { 
    TypeClub,
    TypeClubFull, 
    TypeClient, 
    CreateUserAccount, 
    LoginUserAccount, 
    TypeGivenService, 
    TypeGivenServiceFull,
    ApiService,
    ApiResponse
}