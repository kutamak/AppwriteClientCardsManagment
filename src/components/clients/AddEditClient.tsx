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
import AddEditCard from "../cards/AddEditCard";
import CardsContext from "@/context/cards/CardContext";

interface EditableClient extends TypeClient {
	$id?: string,
}

export const AddEditClient = () => {
	const [currentClient, setCurrentClient] = useState<EditableClient>({ full_name: "", email: "", phone_number: "", more_info: "", card_type:"" })
	const [editCard, setEditCard] = useState<boolean>(false);
	const { listClients, setListClients, addEditClient, setAddEditClient, } = useContext(ClientsContext);
	const { setAddEditCard, addEditCard } = useContext(CardsContext);

	const clientService = myClientService;

	const toggleEditCard = (ev: ChangeEvent<HTMLInputElement>) => {
		setAddEditCard({ times_used: 0, user2cards:"",expires_date: new Date(), card_type:"", is_active: true })
		setEditCard(ev.currentTarget.checked)
	}
	const updateField = (ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		setCurrentClient({
			...currentClient,
			[ev.currentTarget.id]: ev.currentTarget.value,
		})
		// editClub =  currentClient
	}

	const closeAddEdit = () => {
		setAddEditClient(null);
	}
	const saveCard2Client = (client: TypeClientFull) => {
		if(addEditCard){
			setAddEditCard({ ...addEditCard, user2cards: client })
		}
		
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
					if(editCard){
						//TODO: update card
					}
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
					if(editCard){
						//TODO: update card
					}
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

						{!currentClient?.$id && (
							<>
								<label className="relative inline-flex items-center cursor-pointer mt-2 mb-2">
										<input
											id="is_active"
											onChange={toggleEditCard}
											type="checkbox"
											value=""
											className="sr-only peer"
											checked={editCard}
										/>
										<div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
										<span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Edit Members Card</span>
									</label>
		
								{/* {addEditClient && editCard && (
									<AddEditCard ignoreUser={true} userId={addEditClient?.$id } />
								)} */}
							</>
						)}
					</form>
				</MyModal>
			)}
		</>
	)

}

export default AddEditClient;