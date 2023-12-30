import myCardService from "@/appwrite/cardsService";
import { convertDateToReadableString, isDbDateIsSameLikeToday } from "@/globals/functions";
import { TypeCardFull } from "@/globals/globalTypes"
import { useState } from "react";
import NiceLoading from "../globals/NiceLoading";

type ShowSingleGivenServicePropsCardRow = {
  givenServiceCard: TypeCardFull,
  index: number,
  onChange: (updatedCard: TypeCardFull) => void,
}

export const ShowSingleGivenServiceCardRow = (props:ShowSingleGivenServicePropsCardRow) => {
  const { givenServiceCard, index, onChange } = props;
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  
  const addEntryToCard = (cardId: string, old_times_used: number) => {
    // This is to prevent double click. or double update
    if(isDbDateIsSameLikeToday(givenServiceCard.$updatedAt)){
      if(!confirm("This card was already updated today. Are you sure you want to update it again?")){
        return;
      }
    }

    setIsUpdating(true);
    // I'm aware that this is not the best way to do this
    // i'm currently lazy to get this records and get the current times_used
    // so i just get it from the table
    // it's an xss attack waiting to happen
    // TODO: fix this
    myCardService.incrementTimesUsed(cardId, old_times_used +1).then((res) => {
      setIsUpdating(false);
      onChange(res);
    });
  }

  if(isUpdating){
    return (
      <tr>
        <td  className="px-6 py-4">{index}</td>
        <td  className="px-6 py-4">
          {typeof givenServiceCard.user2cards ==="object" ? givenServiceCard.user2cards.full_name : givenServiceCard.user2cards} 
        </td>
        <td  className="px-6 py-4">
          {convertDateToReadableString(givenServiceCard.expires_date)}
        </td>
        <td colSpan={2} className="px-6 py-4">
          <NiceLoading height="5px" />
        </td>
      </tr>
    )
  }

  return (
    <tr className={`dark:hover:bg-slate-700 bg-  ${isDbDateIsSameLikeToday(givenServiceCard.$updatedAt)? "bg-lime-950" : ""}`}>
      <td  className="px-6 py-4">{index}</td>
      <td  className="px-6 py-4">
        {typeof givenServiceCard.user2cards ==="object" ? givenServiceCard.user2cards.full_name : givenServiceCard.user2cards} 
      </td>
      <td  className="px-6 py-4">
        {convertDateToReadableString(givenServiceCard.expires_date)}
      </td>
      <td  className="px-6 py-4">
        {givenServiceCard.times_used} Of {typeof givenServiceCard.card_type ==="object" ? givenServiceCard.card_type.usageCountLimit : "unknown"}
      </td>
      <td  className="px-6 py-4">
        <button onClick={() => addEntryToCard(givenServiceCard.$id, givenServiceCard.times_used)}>
          ADD ENTRY NOW
        </button>

      </td>
    </tr>
  )

}

export default ShowSingleGivenServiceCardRow;