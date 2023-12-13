import { useState } from "react";
import { TypeClub, TypeClubFull } from "@/globals/globalTypes";
import { CardTypesContextPreProvider } from "./CardTypeContext";

export const CardTypesContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [listCards, setListCards] = useState<TypeClubFull[]>([]);
  const [addEditClub, setAddEditClub] = useState<TypeClub | null>(null);
  return (
    <CardTypesContextPreProvider value={{ listCards , setListCards, addEditClub, setAddEditClub }}>
      {children}
    </CardTypesContextPreProvider>
  );
}