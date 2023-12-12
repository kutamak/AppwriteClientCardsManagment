import { useState } from "react";
import { TypeCard, TypeCardFull } from "@/globals/globalTypes";
import { CardsContextPreProvider } from "./CardContext";

export const CardsContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [listCards, setListCards] = useState<TypeCardFull[]>([]);
  const [addEditClub, setAddEditClub] = useState<TypeCard | null>(null);
  return (
    <CardsContextPreProvider value={{ listCards , setListCards, addEditClub, setAddEditClub }}>
      {children}
    </CardsContextPreProvider>
  );
}