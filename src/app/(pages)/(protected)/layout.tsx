"use client"
import Header from "@/components/Header"
import { CardTypesContextProvider } from "@/context/cardTypes/CardTypeProvider"
import { CardsContextProvider } from "@/context/cards/CardProvider"
import ClientsProvider from "@/context/clients/ClientsProvider"
import GivenServicesProvider from "@/context/givenServices/GivenServicesProvider"
import useAuth from "@/context/useAuth"
import { useRouter } from "next/navigation"

import React from "react"

const ProtectedLayout = ({
    children,
  }: {
    children: React.ReactNode
  }) => {

    const router = useRouter();
    const { authStatus } = useAuth();

    if (!authStatus) {
        router.replace("/login");
        return <></>;
    }
    return (
      <CardTypesContextProvider>
        <GivenServicesProvider>
          <ClientsProvider>
            <CardsContextProvider>
              {children}
            </CardsContextProvider>
          </ClientsProvider>
        </GivenServicesProvider>
      </CardTypesContextProvider>
    )
    
}

export default ProtectedLayout;