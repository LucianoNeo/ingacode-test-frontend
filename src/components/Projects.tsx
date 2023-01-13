import { useState } from "react";
import CreateProjectModal from "./CreateProjectModal";
import ProjectCard from "./ProjectCard";

interface Iprops {
    projects: [{
        id: string
        name: string
        Tasks: [{
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

    }]
}



function Projects({ projects }: Iprops) {

    const [createModalVisible, setCreateModalVisible] = useState(false)



    function closeCreateModal() {
        setCreateModalVisible(false)
    }

    return (
        <>
            <section className="text-white flex md:h-[75vh] flex-col w-[85%] md:w-[90%] text-end ml-12 md:mx-auto overflow-hidden bg-slate-900 md:mt-4 overflow-y-hidden">
                <div className="flex bg-gradient-to-r from-orange-400 to-orange-600 px-4 py-2 rounded-t-xl justify-end items-start pt-2">
                    <h1 className="text-xl md:text-3xl font-extrabold">PROJETOS</h1>
                </div>
                <div className="flex flex-row overflow-auto items-start justify-start overflow-y-hidden py-4 pr-24 gap-4 h-[66vh]">
                    {projects.map((project, index) => (
                        <ProjectCard key={index} id={project.id} name={project.name} tasks={project.Tasks} />
                    )
                    )}

                </div>


            </section>
            <button
                onClick={() => setCreateModalVisible(true)}
                className="bg-orange-500 rounded-full w-12 h-12 absolute bottom-5 right-10 hover:opacity-80">
                +
            </button>

            <CreateProjectModal visible={createModalVisible} close={closeCreateModal} />
        </>
    )
}

export default Projects
