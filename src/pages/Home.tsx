import Logo from "../components/Logo"
import { GiHamburgerMenu } from 'react-icons/gi';
import { useState } from "react";
import { AiOutlineUser, AiOutlineClose } from 'react-icons/ai'
import { BiExit } from 'react-icons/bi'
import Menu from "../components/Menu";

function Home() {
  const [username, setUserName] = useState('Luciano')
  const [close, setClose] = useState(false)
  return (
    <>
      <header className="bg-gray-900 text-white w-full h-14 p-1 flex items-center justify-between">
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
          <Logo size='4xl' />
        </div>
        <div className="flex items-start justify-start gap-4">
          <AiOutlineUser size={26} />
          <span className="text-lg">Olá, {username}!</span>
          <button className="text-red">
            <BiExit size={26} />
          </button>
        </div>
      </header>
      <Menu open={close} />
    </>
  )
}

export default Home
