// import cardsService from "@/appwrite/cardsTypeService";
// import cardsService from "@/appwrite/cardsTypeService";
import myCardService from "@/appwrite/cardsService";
import CardsContext from "@/context/cards/CardContext";
import { TypeCardFull, extraQueryParams } from "@/globals/globalTypes";
import { useContext, useEffect, useState } from "react";


const useGetCards = () => {
  const [isLoading, setIsLoading] = useState(true);

  const {listCards,setListCards} = useContext(CardsContext);

  
	const refreshList = async (params?: extraQueryParams) => {
    setIsLoading(true);
		const myLists = await myCardService.getList(params);
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

export default useGetCards;