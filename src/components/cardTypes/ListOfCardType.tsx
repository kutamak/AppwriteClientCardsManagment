"use client"
import cardsTypeService from "@/appwrite/cardsTypeService";
import CardTypeContext from "@/context/cardTypes/CardTypeContext";
import useGetCardTypes from "@/hooks/useGetCardTypes";
import { useContext } from "react"


const ListOfCardType = (): React.ReactElement => {
	const {setListClubs, setAddEditClub} = useContext(CardTypeContext);
	const {isLoading,listClubs} = useGetCardTypes();

	const doDelete = async (clubId: string) => {
		const deletedClub = await cardsTypeService.delete(clubId)
		// TODO: Check if user has permission to delete this!;
		if(deletedClub){
			// doFetch();
			const newListClubs = (listClubs) ? [...listClubs] : []
			const delIdx:number = listClubs?.findIndex(club => clubId === club.$id)
			newListClubs.splice(delIdx,1)
			setListClubs(newListClubs);
		}
	}

	const doEdit = (idx:number) => {
		if(listClubs){
			setAddEditClub(listClubs[idx])
		}else{
			// impossible getting here
		}

	}

	if (isLoading) {
		return <div>Loading...</div>
	}
	return (
		<div>
			List of Card Types:
			<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
				<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
					<tr>
						<th scope="col" className="px-2 py-3">
							#
						</th>
						<th scope="col" className="px-6 py-3">
							Card Title
						</th>
						<th scope="col" className="px-6 py-3">
							Description
						</th>
						<th scope="col" className="px-6 py-3">
							Join Price
						</th>
						<th scope="col" className="px-6 py-3">
							Usage Limit
						</th>
						<th scope="col" className="px-6 py-3">
							Actions
						</th>
					</tr>
				</thead>
				<tbody>
					{
						listClubs?.map((club, i) =>
						(
							<tr key={i} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
								<th scope="row" className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
									# {i + 1}
								</th>
								<th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
									{club.title}
								</th>
								<td className="px-6 py-4">
									{club.description}
								</td>
								<td className="px-6 py-4">
									{club?.joinPrice?.toString()}
								</td>
								<td className="px-6 py-4">
									{club?.usageCountLimit?.toString()}
								</td>
								<td className="px-6 py-4">
									<button 
										onClick={()=>{doEdit(i)}}
										className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
											Edit
									</button>
									<span className="px-2"> | </span>
									<button 
										onClick={() => {doDelete(club.$id)}} 
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
	)
}

export default ListOfCardType;