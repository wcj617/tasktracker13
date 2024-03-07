'use client'
import Image from 'next/image'
import {useEffect, useState} from 'react';
import Link from 'next/link';
import Button from './Button';

export default function Logo (){
    const [width, setWidth] = useState(0);
    const updateWidth = () => {
        const newWidth = window.innerWidth;
        setWidth(newWidth);
    };

    useEffect(() => {
        window.addEventListener('resize', updateWidth);
        updateWidth();
        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    const [showButton, setShowButton] = useState(false);

    const changeNavButton = () => {
        if (window.scrollY >= 400 && window.innerWidth < 768) {
            setShowButton(true);
        } else {
            setShowButton(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', changeNavButton);
    }, []);

    return (
        <>
            <Link href='/' style={{display: showButton ? 'none' : 'block'}}>
                <Image src='/img-192x192.png'
                       alt='Logo'
                       width={width < 1024 ? '50' : '100'}
                       height={width < 1024 ? '40' : '50'}
                       className='relative'
                />
            </Link>
            <div
                style={{
                    display: showButton ? 'block' : 'none',
                }}
            >
                <Button />
            </div>
        </>
    );
};