"use client"

import { useContext } from "react"
import ClientsContext from "@/context/clients/ClientsContext";

export const CreateNewClientButton = () => {
	const { setAddEditClient } = useContext(ClientsContext);

	return (
		<button 
			onClick={() => setAddEditClient({ full_name: "", email:"", phone_number:"", more_info:""})} 
			className="flex justify-center items-center bg-orange-200/70 hover:bg-orange-100 rounded-xl p-4">
			Create New Client
		</button>
	)
}

export default CreateNewClientButton