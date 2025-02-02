"use client"
import Link from "next/link";

import cardsTypeService from "@/appwrite/cardsTypeService";
import givenServicesService from "@/appwrite/givenServicesService";
import CardTypeContext from "@/context/cardTypes/CardTypeContext";
import GivenServicesContext from "@/context/givenServices/GivenServicesContext";
import useGetCardTypes from "@/hooks/useGetCardTypes";
import useGetGivenService from "@/hooks/useGetGivenServices";
import { useContext } from "react"


const ListOfGivenServices = (): React.ReactElement => {
	const { addEditGivenService,setAddEditGivenService,setListGivenServices} = useContext(GivenServicesContext);
	const {isLoading, listGivenServices} = useGetGivenService();

	const doDelete = async (givenServiceId: string) => {
		const deletedClub = await givenServicesService.delete(givenServiceId)
		// TODO: Check if user has permission to delete this!;
		if(deletedClub){
			// doFetch();
			const newListGivenSerivce = (listGivenServices) ? [...listGivenServices] : []
			const delIdx:number = listGivenServices?.findIndex(givenService => givenServiceId === givenService.$id)
			newListGivenSerivce.splice(delIdx,1)
			setListGivenServices(newListGivenSerivce);
		}
	}

	const doEdit = (idx:number) => {
		if(listGivenServices){
			setAddEditGivenService(listGivenServices[idx])
		}else{
			// impossible getting here
		}

	}

	if (isLoading) {
		return <div>Loading...</div>
	}
	return (
		<div>
			List of The services you give:
			<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
				<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
					<tr>
						<th scope="col" className="px-2 py-3">
							#
						</th>
						<th scope="col" className="px-6 py-3">
							Service Title
						</th>
						<th scope="col" className="px-6 py-3">
							Description
						</th>
						<th scope="col" className="px-6 py-3">
							Card Types
						</th>
						<th scope="col" className="px-6 py-3">
							Actions
						</th>
					</tr>
				</thead>
				<tbody>
					{
						listGivenServices?.map((givenService, i) =>
						(
							<tr key={i} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
								<th scope="row" className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
									# {i + 1}
								</th>
								<th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
								<Link href={`givenServices/${givenService.$id}`}
										className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
										{givenService.title}
									</Link>
								</th>
								<td className="px-6 py-4">
									{givenService.description}
								</td>
								<td className="px-6 py-4">
									<ul>

										{givenService.cardTypes.map(gs => (
											<li key={gs.$id}>
												{gs.title}
											</li>
										))}
									</ul>
								</td>
								<td className="px-6 py-4">
									
									<button 
										onClick={()=>{doEdit(i)}}
										className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
											Edit
									</button>
									<span className="px-2"> | </span>
									<button 
										onClick={() => {doDelete(givenService.$id)}} 
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

export default ListOfGivenServices;