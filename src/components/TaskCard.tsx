import { IoMdAddCircle } from "react-icons/io"
import { BiTask, BiTime } from 'react-icons/bi'
import TimeTracker from "./TimeTracker"
interface Iprops {
    name: string
    description: string
    project: string
    collaborator: string

}

function TaskCard({ name, project, collaborator, description }: Iprops) {
    return (
        <div className="flex flex-col justify-center flex-wrap p-4 mx-auto gap-4">
            <div className="bg-slate-800 w-[75vw] md:w-96 rounded-xl flex p-4 justify-evenly items-center overflow-hidden">
                <div className="flex items-center gap-4">

                    <div className='flex flex-col overflow-hidden'>
                        <div className="flex items-center justify-between">
                            <BiTask size={48} />
                            <span className="font-extrabold uppercase text-xl text-start">{name}</span>
                        </div>
                        <div className='flex gap-1 text-start mt-4 text-xs '>
                            <p className='font-bold'>Projeto:</p>
                            <p>{project}</p>
                        </div>
                        <div className='flex gap-1 text-start mt-4 text-xs flex-col'>
                            <p className='font-bold'>Colaborador:</p>
                            <div className="bg-[#0C0B10] w-20 text-center p-1 rounded">
                                <p>{collaborator}</p>
                            </div>
                        </div>
                        <div className='flex gap-1 flex-col text-start mt-4'>
                            <p className='text-xs font-bold'>Descrição:</p>
                            <div
                                className="bg-slate-800 text-xs w-[100%] h-20 overflow-auto">
                                {description}
                            </div>
                        </div>
                        <div>
                            <p className="text-xs text-start mt-2 font-bold ">TimeTrackers:</p>
                            <div className="flex gap-2  pb-2 overflow-auto">
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