import ProfileCard from "@/components/ProfileCard";
import Link from "next/link";
import React from "react";

const ProfilePage = () => {
    return (
        <div className="w-full max-w-xl mx-auto py-8 flex flex-wrap gap-y-6">
            <h1 className=" w-full flex items-center gap-x-4">
                <Link href={"../"}>
                    <span className="inline-flex justify-center items-center w-10 h-10 bg-gray-200/70 hover:bg-gray-100 rounded-xl">
                        &lt;
                    </span>
                </Link>
                <span className="text-3xl font-bold">My Account</span>
            </h1>
            <div className="w-full max-w-xl items-center">
                <Link href={"./givenServices"} className="bg-blend-color-burn bg-orange-500 p-3 mr-3 rounded-md">Given Services</Link>
                <Link href={"./cardTypes"} className="bg-blend-color-burn bg-orange-500 p-3 rounded-md">Card Types</Link>
                <Link href={"./clients"} className="bg-blend-color-burn bg-orange-500 p-3 rounded-md">Clients</Link>
            </div>
            <ProfileCard />
        </div>
    );
}

export default ProfilePage;