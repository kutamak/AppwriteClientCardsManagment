"use client"

import { ChangeEvent, useContext, useEffect, useState } from "react"
import MyModal from "../globals/MyModal"
import cardsService from "@/appwrite/cardsTypeService";
import { TypeClubFull, TypeClient, TypeClientFull } from "@/globals/globalTypes";
// import ClientsContext from "@/context/clientServices/ClientsContext";
// import clientServicesService from "@/appwrite/clientServicesService";
import CardTypesContext from "@/context/cardTypes/CardTypeContext";
import useGetCardTypes from "@/hooks/useGetCardTypes";
import ClientsContext from "@/context/clients/ClientsContext";
import myClientService from "@/appwrite/clientsService";

interface EditableClient extends TypeClient {
	$id?: string,
}

export const AddEditClient: React.FC = () => {
	const [currentClient, setCurrentClient] = useState<EditableClient>({ full_name: "", email: "", id: "", phone_number: "", more_info: "" })
	const { listClients, setListClients, addEditClient, setAddEditClient, } = useContext(ClientsContext);
	const { listCards, isLoading } = useGetCardTypes();

	const clientService = myClientService;

	const updateField = (ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		setCurrentClient({
			...currentClient,
			[ev.currentTarget.id]: ev.currentTarget.value,
		})
		// editClub =  currentClient
	}
	// const updateSelectedArr = (ev: React.FormEvent<HTMLInputElement>)  =>{
	// 	// ev.preventDefault();
	// 	const currentCardTypeId = ev.currentTarget.value;
	// 	const updatedCardTypes = [...currentClient.cardTypes];
	// 	if(!ev.currentTarget.checked) {
	// 		// Removing
	// 		const isChecked = currentClient.cardTypes.findIndex(elm => currentCardTypeId === elm.$id)
	// 		updatedCardTypes.splice(isChecked,1);
	// 	}else{
	// 		// Adding.
	// 		const newClubType = listCards.find(elm => elm.$id === currentCardTypeId)
	// 		if(newClubType){
	// 			updatedCardTypes.push(newClubType)
	// 		}
	// 	}

	// 	setCurrentClient({...currentClient, cardTypes: updatedCardTypes});
	// }
	const closeAddEdit = () => {
		setAddEditClient(null);
	}

	const confirmSaving = () => {
		if (currentClient?.$id) {
			clientService.update(currentClient?.$id, currentClient).then(res => {
				if (res.$id && listClients) {
					// all is successfull
					const newlistClients = [...listClients];
					const updatedIdx = listClients.findIndex(currClientn => res.$id === currClientn.$id)
					newlistClients[updatedIdx] = res;
					setListClients(newlistClients);
					closeAddEdit();
				} else {
					throw new Error("Something went wrong")
				}
			})
		} else {
			// it's creating new
			clientService.create(currentClient).then(res => {
				if (res.$id) {
					// all is successfull
					setListClients([
						...listClients,
						res
					])
					closeAddEdit();
				} else {
					console.log("Something went wrong", res)
					throw new Error("Something went wrong")
				}
			}).catch(e => {
				console.log("Error !!!", e)
			})
		}
	}
	useEffect(() => {
		if (addEditClient) {
			setCurrentClient(addEditClient);
		}
	}, [addEditClient])

	return (
		<>
			{addEditClient && (

				<MyModal openModal={addEditClient !== null} title="Add / Edit your Client" doClose={closeAddEdit} doConfirm={confirmSaving} >
					<form className="p-4 md:p-5">
						<div className="col-span-2 sm:col-span-1">
							<label
								htmlFor="full_name"
								className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
								Full Name
							</label>
							<input
								onChange={updateField}
								value={currentClient?.full_name || ''}
								type="text"
								name="full_name"
								id="full_name"
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
								placeholder="Full Name" />
						</div>
						<div className="col-span-2 sm:col-span-1">
							<label
								htmlFor="email"
								className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
								email
							</label>
							<input
								onChange={updateField}
								value={currentClient?.email || ''}
								type="text"
								name="email"
								id="email"
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
								placeholder="Email" />
						</div>
						<div className="col-span-2 sm:col-span-1">
							<label
								htmlFor="phone_number"
								className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
								Phone Number
							</label>
							<input
								onChange={updateField}
								value={currentClient?.phone_number || ''}
								type="text"
								name="phone_number"
								id="phone_number"
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
								placeholder="Phone Number" />
						</div>
						<div className="col-span-2 sm:col-span-1">
							<label
								htmlFor="more_info"
								className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
								More Info
							</label>

							<textarea
								onChange={updateField}
								value={currentClient?.more_info || ""}
								rows={3}
								name="more_info"
								id="more_info"
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
								placeholder="More Info" />
						</div>

						{
							isLoading ? ("Loading Card Types...")
								: (
									<div className="col-span-2 sm:col-span-1">
										<label htmlFor="userCard" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an card</label>
										<select
											id="userCard"
											onChange={updateField}
											className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										>
											<option>Choose a card</option>
											{
												listCards.map(singleCard => (
													<option
														// checked={0 <= currentGivenSerivce.cardTypes.findIndex(tmpCard => typeof tmpCard === "string" ? tmpCard === singleCard.$id : tmpCard.$id == singleCard.$id)} 
														key={singleCard.$id}
														value={singleCard.$id}
													>
														{singleCard.title}
													</option>
												))
											}
										</select>

									</div>
								)
						}

					</form>
				</MyModal>
			)}
		</>
	)

}

export default AddEditClient;