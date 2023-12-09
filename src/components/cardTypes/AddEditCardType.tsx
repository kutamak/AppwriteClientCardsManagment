"use client"

import { ChangeEvent, useContext, useEffect, useState } from "react"
import MyModal from "../globals/MyModal"
import cardsService from "@/appwrite/cardsTypeService";
import { TypeClub, TypeClubFull } from "@/globals/globalTypes";
import CardsContext from "@/context/cardTypes/CardTypeContext";

interface EditableClub extends TypeClub {
	$id?: string,
}

export const AddEditCardType: React.FC = () => {
	const [currentClubInfo, setCurrentClubInfo] = useState<EditableClub>({ title: "", description: "", joinPrice: 0, usageCountLimit: 1 })
	const { listCards, setListCards, addEditClub, setAddEditClub } = useContext(CardsContext);

	// const [isOpen, setIsOpen ] = useState(true);

	const cardservice = cardsService;

	const updateField = (ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setCurrentClubInfo({
			...currentClubInfo,
			[ev.currentTarget.id]: ev.currentTarget.value,
		})
		// editClub =  currentClubInfo
	}
	const closeAddEdit = () => {
		setAddEditClub(null);
	}

	const confirmSaving = () => {
		if (currentClubInfo?.$id) {
			cardservice.update(currentClubInfo?.$id, currentClubInfo).then(res => {
				if (res.$id && listCards) {
					// all is successfull
					const newListCards = [...listCards] ;
					const updatedIdx = listCards.findIndex(club => res.$id === club.$id)
					newListCards[updatedIdx] = res;
					setListCards(newListCards);
					closeAddEdit();
				} else {
					throw new Error("Something went wrong")
				}
			})
		} else {
			// it's creating new
			cardservice.create(currentClubInfo).then(res => {
				if (res.$id) {
					// all is successfull
					setListCards([
						...listCards,
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
		if(addEditClub){
			setCurrentClubInfo(addEditClub);
		}
	}, [addEditClub])

	return (
		<>
			{addEditClub && (

				<MyModal openModal={addEditClub !== null} title="Add/Edit Club" doClose={closeAddEdit} doConfirm={confirmSaving} >
					<form className="p-4 md:p-5">
						<div className="col-span-2 sm:col-span-1">
							<label
								htmlFor="title"
								className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
								title
							</label>
							<input
								onChange={updateField}
								value={currentClubInfo?.title || ''}
								type="text"
								name="title"
								id="title"
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
								placeholder="Cards title" />
						</div>
						<div className="col-span-2 sm:col-span-1">
							<label
								htmlFor="description"
								className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
								description
							</label>

							<textarea
								onChange={updateField}
								value={currentClubInfo?.description || ""}
								rows={3}
								name="description"
								id="description"
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
								placeholder="Club description" />
						</div>

						<div className="col-span-2 sm:col-span-1">
							<label
								htmlFor="price"
								className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
								joinPrice
							</label>
							<div className="flex">
								<span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
									(€)
								</span>

								<input
									onChange={updateField}
									value={currentClubInfo?.joinPrice}
									type="text"
									name="joinPrice"
									id="joinPrice"
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-none rounded-e-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
									placeholder="10" />
							</div>
						</div>
						<div className="col-span-2 sm:col-span-1">
							<label
								htmlFor="price"
								className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
								Usage Count Limit
							</label>
							<div className="flex">

								<input
									onChange={updateField}
									value={currentClubInfo?.usageCountLimit}
									type="text"
									name="usageCountLimit"
									id="usageCountLimit"
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-none rounded-e-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
									placeholder="10" />
							</div>
						</div>

					</form>
				</MyModal>
			)}
		</>
	)

}

export default AddEditCardType;