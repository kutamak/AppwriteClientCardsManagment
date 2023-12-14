"use client"
import React from 'react'
import { useParams } from 'next/navigation'
import Link from "next/link";
import ShowSingleGivenService from '@/components/givenServices/ShowSingleGivenService';


const ActiveServicePage = () => {
    const myParams = useParams()
    console.log("useParams", useParams());

    return (
        <div className="w-full max-w-xl mx-auto py-8 flex flex-wrap gap-y-6">
            <h1 className=" w-full flex items-center gap-x-4">
                <Link href={"./profile"}>
                    <span className="inline-flex justify-center items-center w-10 h-10 bg-gray-200/70 hover:bg-gray-100 rounded-xl">
                        &lt;
                    </span>
                </Link>
                <span className="text-3xl font-bold">Active Services:   return <p>Post: </p></span>
            </h1>
            <div className="flex flex-col flex- gap-y-6 flex-wrap">
                <ShowSingleGivenService givenServiceId={myParams.id} />
            </div>
        </div>
    );
}

export default ActiveServicePage;