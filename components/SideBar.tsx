"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { sidebarLinks } from '../constants';
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";

const SideBar = ({user}: SideBarProps) => {

    const pathname = usePathname();

  return (
    <section className="sidebar">
      <nav className='flex flex-col gap-4'>
        <Link href='/'
        className="mb-12 cursor-pointer flex items-center gap-2">
            <Image 
            src="/icons/logodraft1.png"
            width={34}
            height={24}
            alt="Atom Money Logo"
            className='size-[54px] max-xl:size-34'
            />
            <h1 className='sidebar-logo'>Atom Money</h1>
        </Link>

        {sidebarLinks.map((item) => {

            const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`)

            return (
                <Link href={item.route} key={item.label}
                    className={cn('sidebar-link', {'bg-bank-gradient': isActive})}
                >
                    <div className='relative size-6'>
                        <Image
                        src={item.imgURL}
                        alt={item.label}
                        fill
                        className={cn({
                        'brightness-[3] invert-0': isActive
                        })}
                        />
                    </div>
                    <p className={cn('sidebar-label', {'!text-white' : isActive})}>
                        {item.label}
                    </p>
                </Link>
            )
        })
        }

        USER

      </nav>

      FOOTER

    </section>
  )
}

export default SideBar;
