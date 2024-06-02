import React from "react";
import SideBar from "../../components/SideBar";
import MobileNav from "../../components/MobileNav";
import Image from "next/image";
import { getLoggedInUser } from "../../lib/Actions/user.actions";
import { redirect } from "next/navigation";


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

    const loggedIn = await getLoggedInUser();

    if (!loggedIn) redirect('/sign-in');

    return (
    <main className="flex h-screen w-full font-inter">
        <SideBar user = {loggedIn} />
        <div className="flex size-full flex-col">
            <div className="root-layout">
                <Image 
                src="/icons/logodraft1.png" 
                width={30} 
                height={30} 
                alt="menu icon" 
                />
                <div>
                    <MobileNav user = {loggedIn}/>
                </div>
            </div>
            {children}
        </div>
    </main>
    );
}
