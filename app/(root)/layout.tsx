import React from "react";
import SideBar from "../../components/SideBar";
import MobileNav from "../../components/MobileNav";
import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

    const loggedIn = {firstname: "Bazu", lastname: "Budengele"};

  return (
   <main className="flex h-screen w-full font-inter">
    <SideBar user = {loggedIn} />
    <div className="flex size-full flex-col">
        <div className="root-layout">
            <Image 
            src="/icons/logodraft2.png" 
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
