import ProjectCard from "./ProjectCard";

interface Iprops {
    username: string;
    close: boolean,
    setClose: Function
}

function Projects() {

    return (
        <>
            <section className="text-white flex md:h-[75vh] flex-col w-[85%] md:w-[90%] text-end ml-12 md:mx-auto overflow-hidden bg-slate-900 md:mt-4 overflow-y-hidden">
                <div className="flex bg-gradient-to-r from-orange-400 to-orange-600 h-12 px-4 rounded-t-xl justify-end items-start pt-2">
                    <h1 className="text-xl md:text-3xl font-extrabold">PROJETOS</h1>
                </div>
                <div className="flex flex-row overflow-auto items-start justify-start overflow-y-hidden p-4 gap-4 h-[66vh]">
                    <ProjectCard name="Projeto 1" task="tarefa 1" />
                    <ProjectCard name="Projeto 2" task="tarefa 13" />
                    <ProjectCard name="Projeto 3" task="tarefa 1rasdaddasdasdasdasdsadasdasdadas" />
                </div>


            </section>
            <button className="bg-orange-500 rounded-full w-12 h-12 absolute bottom-5 right-10 hover:opacity-80">
                +
            </button>

        </>
    )
}

export default Projects
