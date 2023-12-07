import cardsTypeService from "@/appwrite/cardsTypeService";
import CardTypesContext from "@/context/cardTypes/CardTypeContext";
import { useContext, useEffect, useState } from "react";

const useGetCardTypes = () => {
  const [isLoading, setIsLoading] = useState(true);

  const {listClubs,setListClubs} = useContext(CardTypesContext);

  
	const refreshList = async () => {
    setIsLoading(true);
		const myLists = await cardsTypeService.getList();
		try {
			if (myLists) {
				setListClubs(myLists?.documents);
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
    listClubs, refreshList, isLoading
  }

}

export default useGetCardTypes;