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

  return (
    <div className={`${isDbDateIsSameLikeToday(givenServiceCard.$updatedAt)? "bg-lime-950" : ""} flex items-center space-x-4 rtl:space-x-reverse`}>
      <div className="flex-shrink-0">

      </div>
      <div className="flex-1 min-w-0">
        <p className="flex-grow text-sm font-medium text-gray-900 truncate dark:text-white">
          {typeof givenServiceCard.user2cards ==="object" ? givenServiceCard.user2cards.full_name : givenServiceCard.user2cards} 
        </p>
        {isUpdating ? (
          <div>
            <NiceLoading height="5px" />
          </div>
        ) : (
          <div>
            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
            {convertDateToReadableString(givenServiceCard.expires_date)}
            </p>
            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
            {givenServiceCard.times_used} Of {typeof givenServiceCard.card_type ==="object" ? givenServiceCard.card_type.usageCountLimit : "unknown"}
            </p>
          </div>
        ) }

      </div>
      <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
        <button onClick={() => addEntryToCard(givenServiceCard.$id, givenServiceCard.times_used)}>
          ADD ENTRY
        </button>
      </div>
    </div>
    
  )

}

export default ShowSingleGivenServiceCardRow;