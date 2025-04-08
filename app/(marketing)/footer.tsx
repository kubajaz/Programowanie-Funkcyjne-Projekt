import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react'

export const Footer = () => {
    return (
        <footer className='hidden lg:block h-20 w-full border-t-2 border-slate-200 p-2'>
            <div className='max-w-screen-lg mx-auto flex items-center justify-evenly h-full'>
                <Button size={"lg"} variant={"ghost"}>
                    <Image src={"/green_body_squircle.png"} alt='Croatian' height={32} width={40} className='mr-4 rounded-md' />
                    Croatian
                </Button>
                <Button size={"lg"} variant={"ghost"}>
                    <Image src={"/green_body_squircle.png"} alt='Spanish' height={32} width={40} className='mr-4 rounded-md' />
                    Spanish
                </Button>
                <Button size={"lg"} variant={"ghost"}>
                    <Image src={"/green_body_squircle.png"} alt='French' height={32} width={40} className='mr-4 rounded-md' />
                    French
                </Button>
                <Button size={"lg"} variant={"ghost"}>
                    <Image src={"/green_body_squircle.png"} alt='Italian' height={32} width={40} className='mr-4 rounded-md' />
                    Italian
                </Button>
                <Button size={"lg"} variant={"ghost"}>
                    <Image src={"/green_body_squircle.png"} alt='Japanese' height={32} width={40} className='mr-4 rounded-md' />
                    Japanese
                </Button>
            </div>
        </footer>
    );
};