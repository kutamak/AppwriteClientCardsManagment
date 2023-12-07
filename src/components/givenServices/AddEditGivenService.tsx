"use client"

import { ChangeEvent, useContext, useEffect, useState } from "react"
import MyModal from "../globals/MyModal"
import clubsService from "@/appwrite/cardsTypeService";
import { TypeClubFull, TypeGivenService, TypeGivenServiceFull } from "@/globals/globalTypes";
import GivenServicesContext from "@/context/givenServices/GivenServicesContext";
import givenServicesService from "@/appwrite/givenServicesService";
import CardTypesContext from "@/context/cardTypes/CardTypeContext";
import useGetCardTypes from "@/hooks/useGetCardTypes";

interface EditableGivenService extends TypeGivenService {
	$id?: string,
}

export const AddEditGivenService: React.FC = () => {
	const [currentGivenSerivce, setCurrentGivenSerivce] = useState<EditableGivenService>({ title: "", description: "", cardTypes: [] })
	const { listGivenServices, setListGivenServices, addEditGivenService, setAddEditGivenService, } = useContext(GivenServicesContext);
	const { listClubs, isLoading } = useGetCardTypes();

	const givenService = givenServicesService;

	const updateField = (ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setCurrentGivenSerivce({
			...currentGivenSerivce,
			[ev.currentTarget.id]: ev.currentTarget.value,
		})
		// editClub =  currentGivenSerivce
	}
	const updateSelectedArr = (ev: React.FormEvent<HTMLInputElement>)  =>{
		// ev.preventDefault();
		const currentCardTypeId = ev.currentTarget.value;
		const updatedCardTypes = [...currentGivenSerivce.cardTypes];
		if(!ev.currentTarget.checked) {
			// Removing
			const isChecked = currentGivenSerivce.cardTypes.findIndex(elm => currentCardTypeId === elm.$id)
			updatedCardTypes.splice(isChecked,1);
		}else{
			// Adding.
			const newClubType = listClubs.find(elm => elm.$id === currentCardTypeId)
			if(newClubType){
				updatedCardTypes.push(newClubType)
			}
		}
		
		setCurrentGivenSerivce({...currentGivenSerivce, cardTypes: updatedCardTypes});
	}
	const closeAddEdit = () => {
		setAddEditGivenService(null);
	}

	const confirmSaving = () => {
		if (currentGivenSerivce?.$id) {
			givenService.update(currentGivenSerivce?.$id, currentGivenSerivce).then(res => {
				if (res.$id && listGivenServices) {
					// all is successfull
					const newlistGivenServices = [...listGivenServices];
					const updatedIdx = listGivenServices.findIndex(currGivenSerivcen => res.$id === currGivenSerivcen.$id)
					newlistGivenServices[updatedIdx] = res;
					setListGivenServices(newlistGivenServices);
					closeAddEdit();
				} else {
					throw new Error("Something went wrong")
				}
			})
		} else {
			// it's creating new
			givenService.create(currentGivenSerivce).then(res => {
				if (res.$id) {
					// all is successfull
					setListGivenServices([
						...listGivenServices,
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
		if (addEditGivenService) {
			setCurrentGivenSerivce(addEditGivenService);
		}
	}, [addEditGivenService])

	return (
		<>
			{addEditGivenService && (

				<MyModal openModal={addEditGivenService !== null} title="Add/Edit Given Serivce" doClose={closeAddEdit} doConfirm={confirmSaving} >
					<form className="p-4 md:p-5">
						<div className="col-span-2 sm:col-span-1">
							<label
								htmlFor="title"
								className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
								title
							</label>
							<input
								onChange={updateField}
								value={currentGivenSerivce?.title || ''}
								type="text"
								name="title"
								id="title"
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
								placeholder="Clubs title" />
						</div>
						<div className="col-span-2 sm:col-span-1">
							<label
								htmlFor="description"
								className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
								description
							</label>

							<textarea
								onChange={updateField}
								value={currentGivenSerivce?.description || ""}
								rows={3}
								name="description"
								id="description"
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
								placeholder="Club description" />
						</div>
						{
							isLoading ? ("Loading Card Types...")
								: (
									<div className="col-span-2 sm:col-span-1">
										<label
											htmlFor="large"
											className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
											usable Card Types
										</label>
										<ul className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
											{
												currentGivenSerivce.cardTypes && listClubs.map(singleCard => (
													<li key={singleCard.$id} className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
														<div className="flex items-center ps-3">
															<input checked={0 <= currentGivenSerivce.cardTypes.findIndex(tmpCard => typeof tmpCard === "string" ? tmpCard === singleCard.$id : tmpCard.$id == singleCard.$id)} onChange={updateSelectedArr} title={singleCard.description} id={singleCard.$id} type="checkbox" value={singleCard.$id} />
															<label htmlFor={singleCard.$id} title={singleCard.description} className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
																{singleCard.title}
															</label>
														</div>
													</li>
												))
											}
										</ul>
									</div>
								)
						}

					</form>
				</MyModal>
			)}
		</>
	)

}

export default AddEditGivenService;