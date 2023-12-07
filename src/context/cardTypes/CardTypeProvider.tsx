import { useState } from "react";
import { TypeClub, TypeClubFull } from "@/globals/globalTypes";
import { CardTypesContextPreProvider } from "./CardTypeContext";

export const ClubsContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [listClubs, setListClubs] = useState<TypeClubFull[]>([]);
  const [addEditClub, setAddEditClub] = useState<TypeClub | null>(null);
  return (
    <CardTypesContextPreProvider value={{ listClubs , setListClubs, addEditClub, setAddEditClub }}>
      {children}
    </CardTypesContextPreProvider>
  );
}