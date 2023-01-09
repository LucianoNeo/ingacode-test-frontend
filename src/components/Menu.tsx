import { AiOutlineDashboard, AiFillProject } from 'react-icons/ai'
import { FaTasks, FaUsers } from 'react-icons/fa'

interface Iprops {
    open: boolean,
    setClose: Function,
    close: boolean,
    setPage: Function,
}

function Menu({ open, setPage, setClose }: Iprops) {

    return (
        <nav className={`flex flex-col w-52 h-[100vh] font-bold bg-orange-500 rounded-sm p-1  absolute transition-all 
        ${open ? 'left-0' : 'left-[-170px]'}`}>
            <ul className='flex flex-col gap-4 py-4 overflow-hidden p-1'>
                <li
                    onClick={() => {
                        setPage('dashboard')
                        setClose(!close)
                    }}
                    className='flex gap-4 hover:text-gray-900 text-justify justify-end cursor-pointer'>
                    <span>DASHBOARD</span>
                    <AiOutlineDashboard size={26} />

                </li>
                <li
                    onClick={() => {
                        setPage('projects')
                        setClose(!close)
                    }}
                    className='flex gap-4 hover:text-gray-900 text-right justify-end cursor-pointer'>
                    <span>PROJETOS</span>
                    <AiFillProject size={26} />

                </li>
                <li
                    onClick={() => {
                        setPage('tasks')
                        setClose(!close)
                    }}
                    className='flex gap-4 hover:text-gray-900 text-right justify-end cursor-pointer'>
                    <span>TAREFAS</span>
                    <FaTasks size={26} />

                </li>
                <li
                    onClick={() => {
                        setPage('collaborators')
                        setClose(!close)
                    }}
                    className='flex gap-4 hover:text-gray-900 text-right justify-end cursor-pointer'>
                    <span>COLABORADORES</span>
                    <FaUsers size={26} />

                </li>

            </ul>
        </nav>
    )
}

export default Menu