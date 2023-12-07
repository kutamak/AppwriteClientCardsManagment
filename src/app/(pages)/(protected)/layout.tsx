"use client"
import Header from "@/components/Header"
import { ClubsContextProvider } from "@/context/cardTypes/CardTypeProvider"
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
      <ClubsContextProvider>
        <GivenServicesProvider>
          {children}
        </GivenServicesProvider>
      </ClubsContextProvider>
    )
    
}

export default ProtectedLayout;