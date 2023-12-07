
import { TypeClub, TypeClubFull } from "@/globals/globalTypes";
import { createContext } from "react";


export const CardTypesContext = createContext<{
    listClubs: TypeClubFull[],
    setListClubs: (clubs: TypeClubFull[]) => void,
    addEditClub: TypeClub | null, 
    setAddEditClub: (club: TypeClub | null) => void,
}>({
    listClubs: [],
    setListClubs: () => {},
    addEditClub: null,
    setAddEditClub:  () => {},
})

export const CardTypesContextPreProvider = CardTypesContext.Provider;



export default CardTypesContext;