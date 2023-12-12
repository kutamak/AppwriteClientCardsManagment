"use client"

import CardsContext from "@/context/cards/CardContext"
import { TypeCard } from "@/globals/globalTypes"
import useGetCardTypes from "@/hooks/useGetCardTypes"
import { useContext, useState } from "react"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export const AddEditCard: React.FC = () => {
  const [currentCard, setCurrentCard] = useState<TypeCard>({
    times_used: 0,
    user2cards: "",
    card_type: "",
    is_actived: false,
    expires_date: new Date(),
  })

  const { listCards, setListCards, addEditClub, setAddEditClub } = useContext(CardsContext);
  const { listCards: listCardTypes, isLoading } = useGetCardTypes();

  const updateField = (ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setCurrentCard({
      ...currentCard,
      [ev.currentTarget.id]: ev.currentTarget.value,
    })
    // editClub =  currentGivenSerivce
  }
  const updateDateField = (date: Date) => {
    console.log("date ?????????", date);
    setCurrentCard({
      ...currentCard,
      expires_date: date,
    })
  }

  console.log("currentCard", currentCard)
  return (
    <form className="p-4 md:p-5">

      {listCardTypes && listCardTypes.length > 0 && (
        <div className="col-span-2 sm:col-span-1">
          <label htmlFor="card_type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an card</label>
          <select
            id="card_type"
            onChange={updateField}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option>Choose a card</option>
            {
              listCards.map(singleCard => (
                <option
                  // checked={0 <= currentGivenSerivce.cardTypes.findIndex(tmpCard => typeof tmpCard === "string" ? tmpCard === singleCard.$id : tmpCard.$id == singleCard.$id)} 
                  key={singleCard.$id}
                  value={singleCard.$id}
                >
                  {singleCard.title}
                </option>
              ))
            }
          </select>


          <div className="col-span-2 sm:col-span-1">
            <label
              htmlFor="times_used"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              EXPIRES DATE
            </label>
            <DatePicker
              onChange={updateDateField}
              selected={currentCard.expires_date}
              dateFormat="dd/MM/yyyy"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Cards times_used" 
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
              value={currentCard?.times_used || ''}
              type="text"
              name="times_used"
              id="times_used"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Cards times_used" />
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              id="is_actived"
              onChange={updateField}
              type="checkbox"
              value=""
              className="sr-only peer"
              checked 
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">is_actived</span>
          </label>
        </div>
      )
      }
    </form>
  )
}

export default AddEditCard;