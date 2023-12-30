"use client";
import { useContext } from "react";
import MyModal from "../globals/MyModal"
import AddEditCard from "./AddEditCard"
import CardsContext from "@/context/cards/CardContext";
import myCardService from "@/appwrite/cardsService";

export const AddEditCardModal = () => {
  const { addEditCard, setAddEditCard, listCards, setListCards } = useContext(CardsContext);

  if(!addEditCard){return <div>Some Error on Edit Modal</div>}
  
  const confirmSaving = () => {
    if("$id" in addEditCard){
      // update
      myCardService.update(addEditCard.$id, addEditCard).then(res => {
        if(res.$id){
          const newListCards = [...listCards] ;
          const updatedIdx = listCards.findIndex(club => res.$id === club.$id)
          newListCards[updatedIdx] = res;
          setListCards(newListCards);
          setAddEditCard(null);
        } else {
          throw new Error("Something went wrong")
        }
      })
    }else{
      // create
      myCardService.create(addEditCard).then(res => {
        if(res.$id){
          setListCards([
            ...listCards,
            res
          ]);
          setAddEditCard(null);
        } else {
          throw new Error("Something went wrong")
        }
      });
    }
  }

  const closeAddEdit = () => {
		setAddEditCard(null)
	}


  if(!addEditCard) return null;

  return (
    <MyModal doClose={closeAddEdit} doConfirm={confirmSaving} title="Add/Edit Card Membership">
      <AddEditCard />
    </MyModal>
  )
}