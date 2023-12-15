
import { TypeCard, TypeCardFull } from "@/globals/globalTypes";
import { createContext } from "react";


export const CardsContext = createContext<{
    listCards: TypeCardFull[],
    setListCards: (cards: TypeCardFull[]) => void,
    addEditCard: TypeCard | TypeCardFull, 
    setAddEditCard: (club: TypeCard | null) => void,
}>({
    listCards: [],
    setListCards: () => {},
    addEditCard: {
        times_used: 0,
        is_active: true,
        expires_date: "",
        card_type: "",
        user2cards: "",
    },
    setAddEditCard:  () => {},
})

export const CardsContextPreProvider = CardsContext.Provider;



export default CardsContext;