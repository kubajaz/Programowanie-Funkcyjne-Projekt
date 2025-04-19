import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react'

export const Footer = () => {
    return (
        <footer className='hidden lg:block h-20 w-full border-t-2 border-slate-200 p-2'>
            <div className='max-w-screen-lg mx-auto flex items-center justify-evenly h-full'>
                <Button size={"lg"} variant={"ghost"}>
                    <Image src={"/chess-checkmates.svg"} alt='Checkmates' height={32} width={40} className='mr-4 rounded-xs' />
                    Checkmates
                </Button>
                <Button size={"lg"} variant={"ghost"}>
                    <Image src={"/chess-positional.svg"} alt='Positional' height={32} width={40} className='mr-4 rounded-xs' />
                    Positional
                </Button>
                <Button size={"lg"} variant={"ghost"}>
                    <Image src={"/chess-tactics.svg"} alt='Tactics' height={32} width={40} className='mr-4 rounded-xs' />
                    Tactics
                </Button>
                <Button size={"lg"} variant={"ghost"}>
                    <Image src={"/chess-memorize.svg"} alt='Memorize' height={32} width={40} className='mr-4 rounded-xs' />
                    Memorize
                </Button>
            </div>
        </footer>
    );
};