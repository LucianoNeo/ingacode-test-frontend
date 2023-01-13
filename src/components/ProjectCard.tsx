import { useState } from "react"
import { AiFillDelete } from 'react-icons/ai'
import { BiEdit } from 'react-icons/bi'
import { GoProject } from "react-icons/go"
import DeleteProjectModal from "./DeleteProjectModal"
import DeleteTaskModal from "./DeleteTaskModal"
import EditProjectModal from "./EditProjectModal"

interface Iprops {
    id: string
    name: string
    tasks: [{
        id: string
        name: string
        TimeTracker: [{
            collaborator: {
                name: string
            }
            startDate: Date
            endDate: Date

        }]
    }
    ]
}



function ProjectCard({ name, tasks, id }: Iprops) {

    const [deleteProjectVisible, setdeleteProjectVisible] = useState(false)
    const [deleteTaskVisible, setdeletetaskVisible] = useState(false)
    const [editModalVisible, seteditModalVisible] = useState(false)
    const [task, setTask] = useState({ name, id })


    function closeModal() {
        setdeleteProjectVisible(false)
        seteditModalVisible(false)
        setdeletetaskVisible(false)
    }

    return (
        <div className="flex flex-col flex-wrap mx-auto h-[60vh] gap-4">
            <DeleteProjectModal visible={deleteProjectVisible} close={closeModal} name={name} id={id} />
            <EditProjectModal visible={editModalVisible} close={closeModal} name={name} id={id} />
            <DeleteTaskModal visible={deleteTaskVisible} close={closeModal} name={task.name} id={task.id} />
            <div className="bg-slate-800 w-[75vw] md:w-96 rounded-xl flex items-start overflow-hidden h-[60vh]">
                <div className="flex  gap-4">

                    <div className='flex flex-col overflow-hidden w-[75vw] md:w-96 p-8 gap-4 relative'>
                        <div className="flex items-center justify-between relative">
                            <GoProject size={48} />
                            <span className="font-extrabold uppercase text-xl text-start">{name}</span>
                            <button
                                onClick={() => seteditModalVisible(true)}
                                className="absolute right-10 top-[-15px] hover:text-orange-600">
                                <BiEdit size={20} />
                            </button>
                            <button
                                onClick={() => setdeleteProjectVisible(true)}
                                className="absolute right-[-10px] top-[-15px] hover:text-red-600">
                                <AiFillDelete size={20} />
                            </button>
                        </div>
                        <span className="text-left">Tarefas:</span>
                        <div className="flex justify-center flex-wrap gap-2 h-[65%] md:h-[75%] overflow-auto p-4 items-center ">

                            {tasks.map((task, index) => (
                                <div key={index} className="bg-orange-600 w-full items-center justify-between text-center text-xs px-4 py-1 rounded-md flex" >
                                    <p className="truncate">{task.name}</p>
                                    <button
                                        onClick={() => {
                                            setTask({ name: task.name, id: task.id })
                                            setdeletetaskVisible(true)

                                        }}
                                        className="hover:text-red-600">
                                        <AiFillDelete size={20} />
                                    </button>
                                </div>


                            ))}

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ProjectCard