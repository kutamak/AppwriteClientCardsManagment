import cardsTypeService from "@/appwrite/cardsTypeService";
import CardTypesContext from "@/context/cardTypes/CardTypeContext";
import { TypeCardFull } from "@/globals/globalTypes";
import { useContext, useEffect, useState } from "react";

const useGetCardTypes = () => {
  const [isLoading, setIsLoading] = useState(true);

  const {listCards,setListCards} = useContext(CardTypesContext);

  
	const refreshList = async () => {
    setIsLoading(true);
		const myLists = await cardsTypeService.getList<TypeCardFull>();
		try {
			if (myLists) {
				setListCards(myLists?.documents);
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
    listCards, refreshList, isLoading
  }

}

export default useGetCardTypes;