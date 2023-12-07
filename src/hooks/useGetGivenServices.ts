import givenServicesService from "@/appwrite/givenServicesService";
import GivenServicesContext from "@/context/givenServices/GivenServicesContext";
import { useContext, useEffect, useState } from "react";

const useGetGivenService = () => {
  const [isLoading, setIsLoading] = useState(true);

  const {listGivenServices,setListGivenServices} = useContext(GivenServicesContext);

  
	const refreshList = async () => {
    setIsLoading(true);
		const myLists = await givenServicesService.getList();
		try {
			if (myLists) {
				setListGivenServices(myLists?.documents);
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
    listGivenServices, refreshList, isLoading
  }

}

export default useGetGivenService;