import { useState } from "react";
import { TypeCard, TypeCardFull } from "@/globals/globalTypes";
import { CardsContextPreProvider } from "./CardContext";

export const CardsContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [listCards, setListCards] = useState<TypeCardFull[]>([]);
  const [addEditCard, setAddEditCard] = useState<TypeCard | null>(null);
  return (
    <CardsContextPreProvider value={{ listCards , setListCards,  addEditCard, setAddEditCard }}>
      {children}
    </CardsContextPreProvider>
  );
}