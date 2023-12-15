"use client"

import CardsContext from "@/context/cards/CardContext"
import { TypeCard, TypeCardFull, TypeClient, TypeClientFull, TypeClubFull } from "@/globals/globalTypes"
import useGetCardTypes from "@/hooks/useGetCardTypes"
import useGetClients from "@/hooks/useGetClients"
import { useContext, useState } from "react"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type TypeAddEditCardProps = {
  userId?: string | undefined,
  ignoreUser?: boolean,
}

export const AddEditCard: React.FC<TypeAddEditCardProps> = ({ userId, ignoreUser } ) => {
  // const { userId, ignoreUser } = props || {};

  const { listCards, setListCards, addEditCard,setAddEditCard } = useContext(CardsContext);
  const { listClients, isLoading:isLoadingClients } = useGetClients();
  const { listCards: listCardTypes, isLoading } = useGetCardTypes();

  const updateField = (ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setAddEditCard({
      ...addEditCard,
      [ev.currentTarget.id]: ev.currentTarget.value,
    })
    // editClub =  currentGivenSerivce
  }
  const updateCheckboxField = (ev: React.FormEvent<HTMLInputElement>) => {
    setAddEditCard({
      ...addEditCard,
      [ev.currentTarget.id]: ev.currentTarget.checked,
    })
  }

  const updateDateField = (date: Date | null) => {
    console.log("date ?????????", date);
    if(date){
      setAddEditCard({
        ...addEditCard,
        expires_date: date,
      })
    }else{
      console.log("IT's null")
    }
  }

  const checkIfCardIsSelected = (singleCard: TypeClubFull) => {
    if (typeof addEditCard.card_type === "string") {
      return addEditCard.card_type === singleCard.$id
    } else {
      return addEditCard.card_type?.$id === singleCard.$id
    }
  }

  const checkIfClientIsSelected = (singleClient: TypeClientFull ) => {
    if (typeof addEditCard.user2cards === "string") {
      return addEditCard.user2cards === singleClient.$id
    } else {
      return addEditCard.user2cards?.$id === singleClient.$id
    }
  }


  console.log("currentCard", addEditCard)
  // console.log("listCardTypes", listCardTypes)
  return (
    <form className="p-4 md:p-5">

      <div className="col-span-2 sm:col-span-1">
      {!ignoreUser && listClients && listClients.length > 0 && (
          <>
          <label htmlFor="user2cards" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Select Your Client
          </label>
          <select
            id="user2cards"
            onChange={updateField}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
            <option>Choose Client</option>
            {
              listClients.map(singleClient => (
                <option
                // checked={0 <= currentGivenSerivce.cardTypes.findIndex(tmpCard => typeof tmpCard === "string" ? tmpCard === singleClient.$id : tmpCard.$id == singleClient.$id)} 
                selected={checkIfClientIsSelected(singleClient)}
                key={singleClient.$id}
                value={singleClient.$id}
                >
                  {singleClient.full_name}
                </option>
              ))
            }
          </select>
          </>
        )}
        {listCardTypes && listCardTypes.length > 0 && (
          <>
          <label htmlFor="card_type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an card</label>
          <select
            id="card_type"
            onChange={updateField}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
            <option>Choose a card</option>
            {
              listCardTypes.map(singleCard => (
                <option
                selected={checkIfCardIsSelected(singleCard)}
                // checked={0 <= currentGivenSerivce.cardTypes.findIndex(tmpCard => typeof tmpCard === "string" ? tmpCard === singleCard.$id : tmpCard.$id == singleCard.$id)} 
                key={singleCard.$id}
                value={singleCard.$id}
                >
                  {singleCard.title}
                </option>
              ))
            }
          </select>
          </>
        )}
        

          <div className="col-span-2 sm:col-span-1">
            <label
              htmlFor="times_used"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              EXPIRES DATE
            </label>
            <DatePicker
              onChange={(val) => {updateDateField(val)}}
              selected={
                typeof(addEditCard.expires_date) === "object" 
                  ? addEditCard.expires_date 
                  : new Date(addEditCard.expires_date || "")
                }
              dateFormat="dd/MM/yyyy"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholderText="Cards expires_date"
            />
          </div>

          <div className="col-span-2 sm:col-span-1">
            <label
              htmlFor="times_used"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              times_used
            </label>
            <input
              onChange={updateField}
              value={addEditCard?.times_used || 0}
              type="number"
              name="times_used"
              id="times_used"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="How many entries are done" />
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              id="is_active"
              onChange={updateCheckboxField}
              type="checkbox"
              value=""
              className="sr-only peer"
              checked={!!addEditCard.is_active}
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">is_active</span>
          </label>

        </div>
    </form>
  )
}

export default AddEditCard;