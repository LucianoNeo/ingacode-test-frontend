import { useState } from "react";
import { AiOutlineClose, AiOutlineUser } from 'react-icons/ai';
import { BiExit } from 'react-icons/bi';
import { GiHamburgerMenu } from 'react-icons/gi';
import Logo from "../components/Logo";

interface Iprops {
    username: string;
    close: boolean,
    setClose: Function
}

function Header({ username, close, setClose }: Iprops) {

    return (
        <>
            <header className="bg-gray-900 text-white w-[102%] md:w-full h-14 p-1 flex items-center justify-between">
                <div className="flex  gap-4">
                    <button
                        className="transition-all text-bold"
                        onClick={() => setClose(!close)}>
                        {
                            close ?
                                <AiOutlineClose size={26} />
                                :
                                <GiHamburgerMenu size={26} />
                        }
                    </button>
                    <Logo size='text-[22px] md:text-[24px]' />
                </div>
                <div className="flex items-start justify-start gap-2">
                    <AiOutlineUser size={26} />
                    <span className="text-lg">Olá, {username}!</span>
                    <button className="text-red">
                        <BiExit size={26} />
                    </button>
                </div>
            </header>

        </>
    )
}

export default Header
