"use client";
import useAuth from "@/context/useAuth";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import Logo from "./Logo";
import { PagesUrls } from "@/globals/globalVars";
import { ProfileDropDown } from "./Headers/ProfileDropdown";
import { useRouter } from "next/router";
import { useClickOutside } from "@/hooks/useClickOutside";

const menuItems = [
	{
		name: "Home",
		href: PagesUrls.HOME,
	},
	{
		name: "Clients",
		href: PagesUrls.CLIENTS,
	},
	{
		name: "Cards",
		href: PagesUrls.CARDS,
	},
	{
		name: "Card Types",
		href: PagesUrls.CARD_TYPES,
	},
	{
		name: "Given Services",
		href: PagesUrls.GIVEN_SERVICES,
	},
];

export default function Header() {
	const { authStatus } = useAuth();
	const headerRef = useRef(null);
	const [isOpen, setIsOpen] = useState(false);
	const [currentPath, setCurrentPath] = useState(window.location.pathname);

	const isCurrentPath = (currPath: string):boolean => {
		if(currPath === PagesUrls.HOME){
			return currentPath === currPath;
		}
		return currentPath.indexOf(currPath) > 0-1;
	}  

	const updateCurrentPath = (path: string) => {
		setCurrentPath(path);
	}
	useClickOutside(headerRef, () => {
		//close the menu 
		setIsOpen(false);

		// check if the path changed
		const path = window.location.pathname;
		if(path !== currentPath){
			setCurrentPath(path);
		}
	});

	if(!authStatus){
		return (
			<nav className="bg-gray-800 text-white p-5 center">
				Welcome to the app
			</nav>
		)
	}
	return (
		<nav className="bg-gray-800" ref={headerRef}>
			<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
				<div className="relative flex h-16 items-center justify-between">
					<div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
						{/* <!-- Mobile menu button--> */}
						<button onClick={() => { setIsOpen(!isOpen) }} type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
							<span className="absolute -inset-0.5"></span>
							<span className="sr-only">Open main menu</span>
							{/* <!--
            Icon when menu is closed.

            Menu open: "hidden", Menu closed: "block"
          --> */}
							<svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
								<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
							</svg>
							{/* <!--
            Icon when menu is open.

            Menu open: "block", Menu closed: "hidden"
          --> */}
							<svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
								<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					</div>
					<div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
						<div className="flex flex-shrink-0 items-center">
							{/* <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company"> */}
						</div>
						<div className="hidden sm:ml-6 sm:block">
							<div className="flex space-x-4">
								{menuItems.map((item) => (
									<Link
										key={`nav${item.name}`}
										href={item.href}
										className={`${isCurrentPath(item.href) ? "bg-gray-900" : ""} text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium`}
										onClick={() => updateCurrentPath(item.href)}
									>
										{item.name}
									</Link>
								))}
							</div>
						</div>
					</div>
					<ProfileDropDown />

				</div>
			</div>

			{/* <!-- Mobile menu, show/hide based on menu state. --> */}
			<div className={`${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 hidden"} transform  transition ease-out duration-100 sm:hidden`} id="mobile-menu">
				<div className="space-y-1 px-2 pb-3 pt-2">
					{/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
					{menuItems.map((item) => (
						<Link
							key={`naveMobile${item.name}`}
							href={item.href}
							className={`${isCurrentPath(item.href) ? "bg-gray-900" : "" }text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium`}
							onClick={() => updateCurrentPath(item.href)}
						>
							{item.name}
						</Link>
					))}

				</div>
			</div>
		</nav>

	);
}
