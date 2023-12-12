"use client"
import Header from "@/components/Header"
import { CardsContextProvider } from "@/context/cardTypes/CardTypeProvider"
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
      <CardsContextProvider>
        <GivenServicesProvider>
          <ClientsProvider>
            <CardsContextProvider>
              {children}
            </CardsContextProvider>
          </ClientsProvider>
        </GivenServicesProvider>
      </CardsContextProvider>
    )
    
}

export default ProtectedLayout;