import { useState } from "react";
import { TypeClientFull, TypeClient } from "@/globals/globalTypes";
import { ClientsContextPreProvider } from "./ClientsContext";

export const ClientsProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [listClients, setListClients] = useState<TypeClientFull[]>([]);
  const [addEditClient, setAddEditClient] = useState<TypeClient | null>(null);
  return (
    <ClientsContextPreProvider value={{ listClients,
      setListClients,
      addEditClient,
      setAddEditClient, }}>
      {children}
    </ClientsContextPreProvider>
  );
}

export default ClientsProvider;