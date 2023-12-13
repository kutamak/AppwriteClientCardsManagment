"use client"

import CardsContext from "@/context/cards/CardContext";
import { useContext } from "react"

export const CreateNewCardButton: React.FC = () => {
	const { setAddEditCard } = useContext(CardsContext);

	return (
		<button onClick={() => setAddEditCard({ times_used: 0, user2cards:"",expires_date: new Date() })} className="flex justify-center items-center bg-orange-200/70 hover:bg-orange-100 rounded-xl p-4">
			Create New Card
		</button>
	)
}

export default CreateNewCardButton