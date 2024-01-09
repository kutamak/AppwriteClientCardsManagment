"use client"
// import cardsService from "@/appwrite/cardsTypeService";
import cardsTypeService from "@/appwrite/cardsTypeService";
import CardsContext from "@/context/cards/CardContext";
import { convertDateToReadableString } from "@/globals/functions";
import useGetCardTypes from "@/hooks/useGetCardTypes";
import useGetCards from "@/hooks/useGetCards";
import { useContext, useEffect, useState } from "react"
import { NiceSwitch } from "../globals/NiceSwitch";
import myCardService from "@/appwrite/cardsService";


const ListOfCards = (): React.ReactElement => {
	const { setListCards, setAddEditCard } = useContext(CardsContext);
	const [showOnlyIsActive, setShowOnlyIsActive] = useState<boolean>(true);
	const { isLoading, listCards, refreshList } = useGetCards();

	const doDelete = async (clubId: string) => {
		const deletedClub = await myCardService.delete(clubId)
		// TODO: Check if user has permission to delete this!;
		if (deletedClub) {
			// doFetch();
			const newListCards = (listCards) ? [...listCards] : []
			const delIdx: number = listCards?.findIndex(club => clubId === club.$id)
			newListCards.splice(delIdx, 1)
			setListCards(newListCards);
		}
	}

	const doEdit = (idx: number) => {
		if (listCards) {
			console.log("This will be now the edit card", listCards[idx])
			setAddEditCard(listCards[idx])
		} else {
			// impossible getting here
		}
	}

	useEffect(() => {
		if (showOnlyIsActive) {

			refreshList({ is_active: showOnlyIsActive })
		} else {
			refreshList()
		}
	}, [showOnlyIsActive]);

	if (isLoading) {
		return <div>Loading...</div>
	}

	return (
		<div className="w-full">
			List of Cards:

			<br />
			<NiceSwitch
				id="showOnlyIsActive"
				onChange={() => { setShowOnlyIsActive(!showOnlyIsActive) }}
				checked={showOnlyIsActive}
				label="Show only active cards"
			/>
				<ul className="w-full divide-y divide-gray-200 dark:divide-gray-700">
					{
						listCards?.map((card, i) =>
						(
							<li className="pb-3 pt-3 sm:pb-4" key={card.$id}>
								<div className="flex items-center space-x-4 rtl:space-x-reverse">
									<div className="flex-shrink-0">

									</div>
									<div className="flex-1 min-w-0">
										<p className="flex-grow text-sm font-medium text-gray-900 truncate dark:text-white">
											<span className="font-bold">
												{i + 1}: &nbsp;
											</span>
											{typeof card.user2cards === "object" ? card.user2cards.full_name : card.user2cards}
										</p>
										<p className="text-sm text-gray-500 truncate dark:text-gray-400">
											{typeof card.card_type === "object" ? card.card_type.title : card.card_type}
										</p>
										<p className="text-sm text-gray-500 truncate dark:text-gray-400">
											{card.times_used.toString()} of {typeof card.card_type ==="object" ? card.card_type.usageCountLimit : "unknown"} | {convertDateToReadableString(card.expires_date)} | {card.is_active ? "Active" : "Not Active"}
										</p>
									</div>
									<div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
										<button
											onClick={() => { doEdit(i) }}
											className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
											Edit
										</button>
										<span className="px-2"> | </span>
										<button
											onClick={() => { doDelete(card.$id) }}
											className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
											Delete
										</button>
									</div>
								</div>
							</li>
						))
					}
				</ul>

		</div>
	)
}

export default ListOfCards;