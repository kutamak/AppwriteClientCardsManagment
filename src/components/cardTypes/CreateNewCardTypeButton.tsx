"use client"

import { useContext } from "react"
import CardsContext from "@/context/cardTypes/CardTypeContext";

export const CreateNewCardTypeButton = () => {
	const { setAddEditClub } = useContext(CardsContext);

	return (
		<button onClick={() => setAddEditClub({ description: "", title: "", joinPrice: 1, usageCountLimit: 1 })} className="flex justify-center items-center bg-orange-200/70 hover:bg-orange-100 rounded-xl p-4">
			Create New Card Type
		</button>
	)
}

export default CreateNewCardTypeButton