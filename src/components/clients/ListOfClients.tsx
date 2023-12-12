"use client"
import Link from "next/link";

import useGetClient from "@/hooks/useGetClients";
import { useContext } from "react"
import ClientsContext from "@/context/clients/ClientsContext";
import myClientService from "@/appwrite/clientsService";


const ListOfClients = (): React.ReactElement => {
	const { addEditClient,setAddEditClient,setListClients} = useContext(ClientsContext);
	const {isLoading, listClients} = useGetClient();

	const doDelete = async (clientId: string) => {
		const deletedClub = await myClientService.delete(clientId)
		// TODO: Check if user has permission to delete this!;
		if(deletedClub){
			// doFetch();
			const newListGivenSerivce = (listClients) ? [...listClients] : []
			const delIdx:number = listClients?.findIndex(givenService => clientId === givenService.$id)
			newListGivenSerivce.splice(delIdx,1)
			setListClients(newListGivenSerivce);
		}
	}

	const doEdit = (idx:number) => {
		if(listClients){
			setAddEditClient(listClients[idx])
		}else{
			// impossible getting here
		}

	}

	console.log("listClients", listClients)
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
							Name
						</th>
						<th scope="col" className="px-6 py-3">
							Email
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
						listClients?.map((client, i) =>
						(
							<tr key={i} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
								<th scope="row" className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
									# {i + 1}
								</th>
								<th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
								{/* <Link href={`clients/${client.$id}`}
										className="font-medium text-blue-600 dark:text-blue-500 hover:underline"> */}
										{client.full_name}
									{/* </Link> */}
								</th>
								<td className="px-6 py-4">
									{client.email}
								</td>
								<td className="px-6 py-4">
									{/* <ul>

										{listClients.cardTypes.map(gs => (
											<li key={gs.$id}>
												{gs.title}
											</li>
										))}
									</ul> */}
								</td>
								<td className="px-6 py-4">
									
									<button 
										onClick={()=>{doEdit(i)}}
										className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
											Edit
									</button>
									<span className="px-2"> | </span>
									<button 
										onClick={() => {doDelete(client.$id)}} 
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

export default ListOfClients;