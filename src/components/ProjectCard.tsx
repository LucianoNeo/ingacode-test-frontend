import { GoProject } from "react-icons/go"
import { AiFillCloseCircle, AiFillDelete } from 'react-icons/ai'
import { BiEdit } from 'react-icons/bi'
interface Iprops {
    name: string
    task: string
}

function ProjectCard({ name, task }: Iprops) {
    return (
        <div className="flex flex-col flex-wrap mx-auto h-[60vh] gap-4">
            <div className="bg-slate-800 w-[75vw] md:w-96 rounded-xl flex items-start overflow-hidden h-[60vh]">
                <div className="flex  gap-4">

                    <div className='flex flex-col overflow-hidden w-[75vw] md:w-96 p-8 gap-4'>
                        <div className="flex items-center justify-between relative">
                            <GoProject size={48} />
                            <span className="font-extrabold uppercase text-xl text-start">{name}</span>
                            <button className="absolute right-10 top-[-15px] hover:text-orange-600">
                                <BiEdit size={20} />
                            </button>
                            <button className="absolute right-[-10px] top-[-15px] hover:text-red-600">
                                <AiFillDelete size={20} />
                            </button>
                        </div>
                        <span className="text-left">Tarefas:</span>
                        <div className="flex justify-between flex-wrap gap-2 h-[65%] md:h-[50%] overflow-auto p-4">
                            <div className="bg-orange-600 w-full items-center justify-between text-center text-xs px-4 py-1 rounded-md flex" >
                                <p className="truncate">{task}</p>
                                <button className="hover:text-red-600">
                                    <AiFillDelete size={20} />
                                </button>
                            </div>
                            <div className="bg-orange-600 w-full items-center justify-between text-center text-xs px-4 py-1 rounded-md flex" >
                                <p className="truncate">{task}</p>
                                <button className="hover:text-red-600">
                                    <AiFillDelete size={20} />
                                </button>
                            </div>
                            <div className="bg-orange-600 w-full items-center justify-between text-center text-xs px-4 py-1 rounded-md flex" >
                                <p className="truncate">{task}</p>
                                <button className="hover:text-red-600">
                                    <AiFillDelete size={20} />
                                </button>
                            </div>
                            <div className="bg-orange-600 w-full items-center justify-between text-center text-xs px-4 py-1 rounded-md flex" >
                                <p className="truncate">{task}</p>
                                <button className="hover:text-red-600">
                                    <AiFillDelete size={20} />
                                </button>
                            </div>
                            <div className="bg-orange-600 w-full items-center justify-between text-center text-xs px-4 py-1 rounded-md flex" >
                                <p className="truncate">{task}</p>
                                <button className="hover:text-red-600">
                                    <AiFillDelete size={20} />
                                </button>
                            </div>
                            <div className="bg-orange-600 w-full items-center justify-between text-center text-xs px-4 py-1 rounded-md flex" >
                                <p className="truncate">{task}</p>
                                <button className="hover:text-red-600">
                                    <AiFillDelete size={20} />
                                </button>
                            </div>
                            <div className="bg-orange-600 w-full items-center justify-between text-center text-xs px-4 py-1 rounded-md flex" >
                                <p className="truncate">{task}</p>
                                <button className="hover:text-red-600">
                                    <AiFillDelete size={20} />
                                </button>
                            </div>
                            <div className="bg-orange-600 w-full items-center justify-between text-center text-xs px-4 py-1 rounded-md flex" >
                                <p className="truncate">{task}</p>
                                <button className="hover:text-red-600">
                                    <AiFillDelete size={20} />
                                </button>
                            </div>
                            <div className="bg-orange-600 w-full items-center justify-between text-center text-xs px-4 py-1 rounded-md flex" >
                                <p className="truncate">{task}</p>
                                <button className="hover:text-red-600">
                                    <AiFillDelete size={20} />
                                </button>
                            </div>


                        </div>


                    </div>
                    <button>
                        adicionar
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProjectCard