import { useState } from "react";
import CreateTaskModal from "./CreateTaskModal";
import TaskCard from "./TaskCard";

interface Iprops {
    tasks: [{
        id: string
        name: string
        description: string
        project: {
            name: string
            id: string
        }
        TimeTracker: [{
            collaborator: {
                name: string
                id: string
            }
            startDate: string
            endDate: string
            id: string
        }]
    }]
}



function Tasks({ tasks }: Iprops) {
    const [createModalVisible, setCreateModalVisible] = useState(false)

    function closeCreateModal() {
        setCreateModalVisible(false)
    }


    return (
        <>
            {!tasks ? (<div>carregando</div>) : (
                <>
                    <section className="text-white flex h-[85vh] flex-col w-[85%] md:w-[90%] text-end ml-12 md:mx-auto overflow-hidden bg-slate-900 md:mt-4">
                        <div className="flex bg-gradient-to-r from-orange-400 to-orange-600 px-4 py-2 rounded-t-xl justify-end items-start pt-2">
                            <h1 className="text-xl md:text-3xl font-extrabold">TAREFAS</h1>
                        </div>
                        <div className="flex flex-row overflow-auto items-start justify-start overflow-y-hidden">
                            {tasks.map((task, index) => (
                                <TaskCard key={index} name={task.name} timetrackers={task.TimeTracker} project={task.project.name} projectId={task.project.id} description={task.description} id={task.id} />

                            )
                            )}
                        </div>


                    </section>
                    <CreateTaskModal visible={createModalVisible} close={closeCreateModal} />
                    <button
                        onClick={() => setCreateModalVisible(true)}
                        className="bg-orange-500 rounded-full w-12 h-12 absolute bottom-5 right-10 hover:opacity-80">
                        +
                    </button>
                </>
            )}
        </>
    )
}

export default Tasks
