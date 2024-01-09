"use client";

import appwriteService from "@/appwrite/config";
import { PagesUrls } from "@/globals/globalVars";
import { Models } from "appwrite";
import Link from "next/link";
import { useEffect, useState } from "react";

export const ProfileDropDown = () => {

  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
  const [isOpen, setIsOpen] = useState(false);


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

  // {/* <!-- Profile dropdown --> */}

  const openMenu = () => {
    setIsOpen(!isOpen)
    // need to add event listener to close it when clicked outside
    // and remove the event listener when the menu is closed

  }


  if(!user){
    return null
  }

  return (
    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
      {/* <button onClick={openMenu} type="button" className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
        <span className="absolute -inset-1.5"></span>
        <span className="sr-only">View notifications</span>
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
        </svg>
      </button> */}

      {/* <!-- Profile dropdown --> */}
      <div className="relative ml-3">
        <div>
          <button onClick={openMenu} type="button" className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
            <span className="absolute -inset-1.5"></span>
            <span className="sr-only">Open user menu</span>
            <img className="h-8 w-8 rounded-full" src="https://i.pravatar.cc/300" alt="" />
          </button>
        </div>
        <div
          className={`${isOpen ?  "opacity-100 scale-100": "opacity-0 scale-95"} transform  transition ease-out duration-100 absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu-button"
        // tabindex="-1"
        >
          {/* <!-- Active: "bg-gray-100", Not Active: "" --> */}
					<Link href={PagesUrls.PROFILE} className="block px-4 py-2 text-sm text-gray-700">Profile</Link>
					<Link href={PagesUrls.LOGOUT} className="block px-4 py-2 text-sm text-gray-700">Logout</Link>

        </div>
      </div>
    </div>
  )
}