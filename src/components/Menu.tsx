import { AiOutlineDashboard, AiFillProject } from 'react-icons/ai'
import { FaTasks, FaUsers } from 'react-icons/fa'
import { BsCardList } from 'react-icons/bs'
import { BiTask } from 'react-icons/bi'
import { BsGithub } from 'react-icons/bs'

interface Iprops {
    open: boolean,
    setClose: Function,
    close: boolean,
    setPage: Function,
}

function Menu({ open, setPage, setClose }: Iprops) {

    return (
        <nav className={`flex flex-col w-52 h-72 font-bold bg-orange-500 rounded-sm px-1  absolute transition-all z-50 overflow-y-hidden
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
                    <BiTask size={26} />

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
                <li
                    onClick={() => {
                        setPage('list')
                        setClose(!close)
                    }}
                    className='flex gap-4 hover:text-gray-900 text-right justify-end cursor-pointer'>
                    <span>RELATÓRIO</span>
                    <BsCardList size={26} />

                </li>

                <li className='flex gap-4 hover:text-gray-900 text-left justify-end cursor-pointer text-xs mt-4'>
                    <a href="http://github.com/LucianoNeo" target='_blank'>
                        <div className='flex justify-between'>
                            Desenvolvido por LucianoNeo <BsGithub size={26} />
                        </div>

                    </a>


                </li>

            </ul>
        </nav>
    )
}

export default Menu