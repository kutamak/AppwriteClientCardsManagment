"use client"

import React, { useEffect, useState } from "react"
interface modalProps {
	children: React.ReactNode,
	openModal?: boolean
	doClose?: () => void,
	doConfirm?: () => void,
	title?: String,
}

export const MyModal = ({
	children,
	openModal,
	doClose = () => {},
	doConfirm,
	title = "My Modal",
}: modalProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const myClose = () => {
		setIsOpen(false);
		doClose();
	}
	const myConfirm = () => {
		if(doConfirm) doConfirm()
	}
	useEffect(() => {
		setIsOpen(openModal || true)
	}, [openModal])

	return (
		<div id="default-modal" aria-hidden="true" className={`${isOpen ? '' : 'hidden'} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
			<div className="relative p-4 w-full max-w-2xl max-h-full">
				{/* <!-- Modal content --> */}
				<div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
					{/* <!-- Modal header --> */}
					<div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
						{title && (<h3 className="text-xl font-semibold text-gray-900 dark:text-white">
							{title}
						</h3>)
						}
						<button onClick={myClose} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
							<svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
								<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
							</svg>
							<span className="sr-only">Close modal</span>
						</button>
					</div>
					{/* <!-- Modal body --> */}
					<div className="p-4 md:p-5 space-y-4">
						{children}
					</div>
					{/* <!-- Modal footer --> */}
					<div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
						{doConfirm && <button onClick={myConfirm} data-modal-hide="default-modal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">SAVE</button> }
						<button onClick={myClose} data-modal-hide="default-modal" type="button" className="ms-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancel</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default MyModal;