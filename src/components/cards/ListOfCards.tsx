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
		<div>
			List of Cards:

			<br />
			<NiceSwitch
				id="showOnlyIsActive"
				onChange={() => { setShowOnlyIsActive(!showOnlyIsActive) }}
				checked={showOnlyIsActive}
				label="Show only active cards"
			/>
			<div className="overflow-auto rounded-lg shadow">
				<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
					<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
						<tr>
							<th scope="col" className="px-2 py-3">
								#
							</th>
							<th scope="col" className="px-6 py-3">
								User Name
							</th>
							<th scope="col" className="px-6 py-3">
								Card Type
							</th>
							<th scope="col" className="px-6 py-3">
								Times Used
							</th>
							<th scope="col" className="px-6 py-3">
								Expires Date
							</th>
							<th scope="col" className="px-6 py-3">
								Status
							</th>
							<th scope="col" className="px-6 py-3">
								Actions
							</th>
						</tr>
					</thead>
					<tbody>
						{
							listCards?.map((card, i) =>
							(
								<tr key={i} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
									<th scope="row" className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
										# {i + 1}
									</th>
									<th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
										{typeof card.user2cards ==="object" ? card.user2cards.full_name: card.user2cards}
									</th>
									<td className="px-6 py-4">
										{typeof card.card_type ==="object" ? card.card_type.title: card.card_type}
									</td>
									<td className="px-6 py-4">
										{card.times_used.toString()}
									</td>
									<td className="px-6 py-4">
										{convertDateToReadableString(card.expires_date)}
									</td>
									<td className="px-6 py-4">
										{card.is_active ? "Active" : "Not Active"}
									</td>
									<td className="px-6 py-4">
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
									</td>
								</tr>
							))
						}
					</tbody>
				</table>
			</div>

		</div>
	)
}

export default ListOfCards;