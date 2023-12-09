"use client"

import { useContext } from "react"
import CardsContext from "@/context/cardTypes/CardTypeContext";
import GivenServicesContext from "@/context/givenServices/GivenServicesContext";

export const CreateNewGivenServiceButton = () => {
	const { setAddEditGivenService } = useContext(GivenServicesContext);

	return (
		<button 
			onClick={() => setAddEditGivenService({ description: "", title: "", cardTypes:[] })} 
			className="flex justify-center items-center bg-orange-200/70 hover:bg-orange-100 rounded-xl p-4">
			Create New Given Service
		</button>
	)
}

export default CreateNewGivenServiceButton