import React from 'react';
import Link from 'next/link'
import Logo from './Logo';
import Button from './Button';

export default function Navbar () {
    return (
        <>
            <div className="w-full h-20 bg-emerald-800 sticky top-0">
                <div className="container mx-auto px-4 h-full">
                    <div className="flex justify-between items-center h-full">
                        <Logo />
                        <ul className="hidden md:flex gap-x-6 text-white">
                            <li>
                                <Link href="/timetracking">
                                    <p>Time Tracking</p>
                                </Link>
                            </li>
                            <li>
                                <Link href="/tasks">
                                    <p>Tasks</p>
                                </Link>
                            </li>
                            <li>
                                <Link href='/analytics'>
                                    <p>Analytics</p>
                                </Link>
                            </li>
                        </ul>
                        <Button />
                    </div>
                </div>
            </div>
        </>
    )
}