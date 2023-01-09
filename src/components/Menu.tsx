import { AiOutlineDashboard, AiFillProject } from 'react-icons/ai'
import { FaTasks, FaUsers } from 'react-icons/fa'

interface Iprops {
    open: boolean
}

function Menu(props: Iprops) {

    return (
        <nav className={`flex flex-col w-52 h-screen font-bold bg-orange-500 rounded-sm p-1  absolute transition-all 
        ${props.open ? 'left-0' : 'left-[-170px]'}`}>
            <ul className='flex flex-col gap-4 py-4 overflow-hidden p-1'>
                <li className='flex gap-4 hover:text-gray-900 text-justify justify-end cursor-pointer'>
                    <span>DASHBOARD</span>
                    <AiOutlineDashboard size={26} />

                </li>
                <li className='flex gap-4 hover:text-gray-900 text-right justify-end cursor-pointer'>
                    <span>PROJETOS</span>
                    <AiFillProject size={26} />

                </li>
                <li className='flex gap-4 hover:text-gray-900 text-right justify-end cursor-pointer'>
                    <span>TAREFAS</span>
                    <FaTasks size={26} />

                </li>
                <li className='flex gap-4 hover:text-gray-900 text-right justify-end cursor-pointer'>
                    <span>COLABORADORES</span>
                    <FaUsers size={26} />

                </li>

            </ul>
        </nav>
    )
}

export default Menu