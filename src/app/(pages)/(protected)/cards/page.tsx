// import ListOfCards from "@/components/cardTypes/ListOfCardType";
import CreateNewClubButton from "@/components/cardTypes/CreateNewCardTypeButton";
import Link from "next/link";
import React from "react";
import { AddEditCardType } from "@/components/cardTypes/AddEditCardType";
import CreateNewCardButton from "@/components/cards/CreateNewCardButton";
import ListOfCards from "@/components/cards/ListOfCards";
import { AddEditCardModal } from "@/components/cards/AddEditCardModal";

const CardTypesPage = () => {

    return (
        <div className="w-full max-w-xl mx-auto py-8 flex flex-wrap gap-y-6">
            <h1 className=" w-full flex items-center gap-x-4">
                <Link href={"./profile"}>
                    <span className="inline-flex justify-center items-center w-10 h-10 bg-gray-200/70 hover:bg-gray-100 rounded-xl">
                        &lt;
                    </span>
                </Link>
                <span className="text-3xl font-bold">Cards</span>
            </h1>
            <div className="flex flex-col flex- gap-y-6 flex-wrap w-full">
                <CreateNewCardButton />
                <AddEditCardModal />
                <ListOfCards />
            </div>
        </div>
    );
}

export default CardTypesPage;