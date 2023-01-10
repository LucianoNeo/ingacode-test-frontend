import { AiFillDelete } from 'react-icons/ai'
import { BiEdit, BiTask } from 'react-icons/bi'
import TimeTracker from "./TimeTracker"
interface Iprops {
    name: string
    description: string
    project: string
    collaborator?: string

}

function TaskCard({ name, project, collaborator, description }: Iprops) {
    return (
        <div className="flex flex-col flex-wrap p-4 mx-auto h-[84vh] gap-4">
            <div className="bg-slate-800 w-[75vw] md:w-96 rounded-xl flex p-4 justify-evenly items-center overflow-hidden relative">
                <button className="absolute right-12 top-4 hover:text-orange-600">
                    <BiEdit size={20} />
                </button>
                <button className="absolute right-4 top-4 hover:text-red-600">
                    <AiFillDelete size={20} />
                </button>
                <div className="flex items-center gap-4">

                    <div className='flex flex-col overflow-hidden'>
                        <div className="flex items-center justify-between mt-6">
                            <BiTask size={48} />
                            <span className="font-extrabold uppercase text-xl text-start">{name}</span>
                        </div>
                        <div className='flex gap-1 text-start mt-4 text-xs '>
                            <p className='font-bold'>Projeto:</p>
                            <p>{project}</p>
                        </div>
                        <div className='flex gap-1 flex-col text-start mt-4'>
                            <p className='text-xs font-bold'>Descrição:</p>
                            <div
                                className="bg-slate-800 text-xs w-[100%] h-10 overflow-auto">
                                {description}
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center gap-4 h-5">
                                <p className="text-xs text-start mt-2 font-bold ">TimeTrackers:</p>
                                <button className="bg-orange-500 rounded-full w-5 h-5 hover:opacity-80 flex items-center justify-center translate-y-1">
                                    +
                                </button>

                            </div>
                            <div className="flex gap-2 w-[70vw] md:w-80 pb-2 overflow-auto px-2 items-center">
                                <TimeTracker />
                                <TimeTracker collaborator="Luciano" />
                                <TimeTracker />

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default TaskCard