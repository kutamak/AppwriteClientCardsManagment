"use client";
import appwriteService from "@/appwrite/config";
import { Models } from "appwrite";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Avatar from "./Avatar";
import { PagesUrls } from "@/globals/globalVars";


const ProfileCard = () => {
    const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);

    useEffect(() => {
        (async () => {
            const userData = await appwriteService.getCurrentUser()
            if (userData) {
                setUser(userData)
            }
        })()
    }, [])

    if (!user) {
        return null
    }

    return (
        <div className="flex gap-y-6 flex-wrap">
            <div className="flex w-full gap-x-4 items-center">
                <div className="shrink-0 w-20">
                    <Avatar img="https://i.pravatar.cc/300" />
                </div>
                <div className="relative">
                    <p className="font-bold text-xl w-full mb-1">{user.name}</p>
                    <div className="text-[12px] p-0.5 inline-block rounded-md bg-gradient-to-tr from-primary to-secondary">
                        <button className="px-2 rounded-md font-bold bg-white text-red-500">FREE</button>
                    </div>
                </div>
            </div>
            <div className="bg-gray-200/70 rounded-xl px-8 py-8 w-full flex gap-y-4 flex-wrap">
                <div className="relative w-full">
                    <p className="text-sm text-gray-700">Display Name</p>
                    <p className="font-semibold">{user.name}</p>
                </div>
                <div className="relative w-full">
                    <p className="text-sm text-gray-700">Email Id</p>
                    <p className="font-semibold">{user.email}</p>
                </div>
                <div className="relative w-full">
                    <div className="w-full flex justify-center">
                        <Link
                            href={PagesUrls.GIVEN_SERVICES}
                            className="bg-red-200/70 rounded-xl px-6 py-3 inline-block hover:bg-gray-100 duration-150"
                        >
                            Give Your Service
                        </Link>
                    </div>
                </div>
            </div>
            <div className="w-full flex justify-center">
                <Link
                    href={PagesUrls.LOGOUT}
                    className="bg-gray-200/70 rounded-xl px-6 py-3 inline-block hover:bg-gray-100 duration-150"
                >
                    Logout
                </Link>
            </div>
        </div>
    )
}

export default ProfileCard;