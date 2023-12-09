
import { TypeClient, TypeClientFull } from "@/globals/globalTypes";
import { createContext } from "react";


export const ClientsContext = createContext<{
    listClients: TypeClientFull[],
    setListClients: (clubs: TypeClientFull[]) => void,
    addEditClient: TypeClient | null, 
    setAddEditClient: (club: TypeClient | null) => void,
}>({
    listClients: [],
    setListClients: () => {},
    addEditClient:null,
    setAddEditClient:  () => {},
})

export const ClientsContextPreProvider = ClientsContext.Provider;

export default ClientsContext;