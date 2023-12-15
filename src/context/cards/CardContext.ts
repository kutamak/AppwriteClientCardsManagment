
import { TypeCard, TypeCardFull } from "@/globals/globalTypes";
import { createContext } from "react";


export const CardsContext = createContext<{
    listCards: TypeCardFull[],
    setListCards: (cards: TypeCardFull[]) => void,
    addEditCard: TypeCard | TypeCardFull | null, 
    setAddEditCard: (club: TypeCard | null) => void,
}>({
    listCards: [],
    setListCards: () => {},
    addEditCard: null,
    setAddEditCard:  () => {},
})

export const CardsContextPreProvider = CardsContext.Provider;



export default CardsContext;