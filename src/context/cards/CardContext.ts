
import { TypeCard, TypeCardFull } from "@/globals/globalTypes";
import { createContext } from "react";


export const CardsContext = createContext<{
    listCards: TypeCardFull[],
    setListCards: (cards: TypeCardFull[]) => void,
    addEditClub: TypeCard | null, 
    setAddEditClub: (club: TypeCard | null) => void,
}>({
    listCards: [],
    setListCards: () => {},
    addEditClub: null,
    setAddEditClub:  () => {},
})

export const CardsContextPreProvider = CardsContext.Provider;



export default CardsContext;