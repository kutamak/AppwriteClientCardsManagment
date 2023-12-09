
import { TypeClub, TypeClubFull } from "@/globals/globalTypes";
import { createContext } from "react";


export const CardTypesContext = createContext<{
    listCards: TypeClubFull[],
    setListCards: (cards: TypeClubFull[]) => void,
    addEditClub: TypeClub | null, 
    setAddEditClub: (club: TypeClub | null) => void,
}>({
    listCards: [],
    setListCards: () => {},
    addEditClub: null,
    setAddEditClub:  () => {},
})

export const CardTypesContextPreProvider = CardTypesContext.Provider;



export default CardTypesContext;