import cardsTypeService from "@/appwrite/cardsTypeService";
import myClientService from "@/appwrite/clientsService";
import ClientsContext from "@/context/clients/ClientsContext";
import { TypeClientFull } from "@/globals/globalTypes";
import { useContext, useEffect, useState } from "react";

const useGetClients = () => {
  const [isLoading, setIsLoading] = useState(true);

  const {listClients, setListClients} = useContext(ClientsContext);

  
	const refreshList = async () => {
    setIsLoading(true);
		const myLists = await myClientService.getList();
		try {
			if (myLists) {
        setListClients(myLists?.documents);
			} else {
				throw new Error("No myList..")
			}
		} catch (e) {
			console.log("Error", e)
		}
		setIsLoading(false)
	}

  useEffect(() => {
		refreshList();
	}, [])

  return {
    listClients, refreshList, isLoading
  }

}

export default useGetClients;