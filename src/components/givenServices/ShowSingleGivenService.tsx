"use client"
import myCardService from "@/appwrite/cardsService";
import givenServicesService from "@/appwrite/givenServicesService";
import { convertDateToReadableString } from "@/globals/functions";
import { TypeCardFull, TypeGivenServiceFull } from "@/globals/globalTypes";
import { useEffect, useState } from "react";
import ShowSingleGivenServiceCardRow from "./ShowSingleGivingServiceCardRow";

type ShowSingleGivenServiceProps = {
  givenServiceId: string | string[];
};


export const ShowSingleGivenService = (props: ShowSingleGivenServiceProps) => {
  const { givenServiceId } = props;
  const [givenService, setGivenService] = useState<TypeGivenServiceFull | null>(null);
  const [usedCards, setUsedCards] = useState<TypeCardFull[]>([]);

  useEffect(() => {
    console.log("useEffect ShowSingleGivenService");
    givenServicesService.getSingle(givenServiceId.toString()).then((res) => {
      setGivenService(res);
    });
  }, []);

  useEffect(() => {
    console.log("givenServiceId", givenServiceId);
    if (givenService?.$id) {
      // if there's something here
      myCardService.getList({ card_type: givenService?.cardTypes.map(ctype => ctype.$id), is_active: true }).then((res) => {
        console.log("res", res);
        setUsedCards(res.documents);
      });
    }

  }, [givenService]);

  const updateRow = (index: number, updatedCard: TypeCardFull) => {
    console.log("updateRow", index, updatedCard);
    const newUsedCards = [...usedCards];
    newUsedCards.splice(index, 1, updatedCard);
    setUsedCards(newUsedCards);
  }

  const addEntryToCard = (cardId: string, old_times_used: number) => {
    // i'm currently lazy to get this records and get the current times_used
    // so i just get it from the table
    console.log("addEntryToCard", cardId, old_times_used);
    myCardService.incrementTimesUsed(cardId, old_times_used + 1).then((res) => {
      console.log("res", res);
      // Now update the list of cards
      const newUsedCards = [...usedCards];
      const findMatchIndex = newUsedCards.findIndex((card) => res.$id === cardId);
      newUsedCards.splice(findMatchIndex, 1, res);
      // newUsedCards.map((card) => {
      //   if(res.$id === cardId){
      //     console.log("update card WITH", res);
      //     return res;
      //   }
      //   return card;
      // });
      console.log("newUsedCards", newUsedCards)
      setUsedCards(newUsedCards);
    });
  }


  console.log(" givenService ", givenService);
  console.log(" usedCards", usedCards);


  if (givenService === null) return (<div>Loading Your Service...</div>)
  // if(usedCards.length === 0 ) return (<div>Loading The Cards for this Service...</div>)
  return (
    <div>
      <h1>ShowSingleGivenService</h1>
      You are viewing the given service: <b>{givenService?.title}</b>
      <br />
      For This, there are {givenService.cardTypes.length} cards:
      <ul>
        {givenService.cardTypes.map((cardType) => (
          <li key={cardType.$id}>{cardType.title}</li>
        ))}
      </ul>
      <br />
      <br />
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-2 py-3">
              #
            </th>
            <th scope="col" className="px-6 py-3">
              User Name
            </th>
            <th scope="col" className="px-6 py-3">
              expires
            </th>
            <th scope="col" className="px-6 py-3">
              Usage
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {(usedCards.length === 0)
            ? (<div>Loading The Cards for this Service...</div>)
            : usedCards?.map((card, i) => (
              <ShowSingleGivenServiceCardRow
                key={card.$id}
                givenServiceCard={card}
                index={i + 1}
                onChange={(updatedCard) => { updateRow(i, updatedCard) }}
              />
            ))}

        </tbody>
      </table>

    </div>
  )
};

export default ShowSingleGivenService;