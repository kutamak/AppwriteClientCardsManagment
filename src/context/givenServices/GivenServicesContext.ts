
import { TypeClub, TypeGivenService, TypeGivenServiceFull } from "@/globals/globalTypes";
import { createContext } from "react";


export const GivenServicesContext = createContext<{
    listGivenServices: TypeGivenServiceFull[],
    setListGivenServices: (cards: TypeGivenServiceFull[]) => void,
    addEditGivenService: TypeGivenService | null, 
    setAddEditGivenService: (club: TypeGivenService | null) => void,
}>({
    listGivenServices: [],
    setListGivenServices: () => {},
    addEditGivenService:null,
    setAddEditGivenService:  () => {},
})

export const GivenServicesContextPreProvider = GivenServicesContext.Provider;

export default GivenServicesContext;