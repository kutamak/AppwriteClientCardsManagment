import { useState } from "react";
import { TypeClub, TypeGivenServiceFull, TypeGivenService } from "@/globals/globalTypes";
import { GivenServicesContextPreProvider } from "./GivenServicesContext";

export const GivenServicesProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [listGivenServices, setListGivenServices] = useState<TypeGivenServiceFull[]>([]);
  const [addEditGivenService, setAddEditGivenService] = useState<TypeGivenService | null>(null);
  return (
    <GivenServicesContextPreProvider value={{ listGivenServices, setListGivenServices, addEditGivenService, setAddEditGivenService }}>
      {children}
    </GivenServicesContextPreProvider>
  );
}

export default GivenServicesProvider;