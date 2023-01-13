import { useMyContext } from "../contexts/MyContext"

interface Iprops {

    setPage: Function
    projects: [] | null
    tasks: [] | null
    dayMinutes: String | null
    monthMinutes: String | null
}

function Dashboard({ setPage, projects, tasks, dayMinutes, monthMinutes }: Iprops) {
    const { collaborators } = useMyContext()
    return (
        <>

            <main className="text-white flex h-[90vh] flex-col w-[90%] md:w-[80%] text-end px-4 ml-10 md:mx-auto overflow-auto pb-10">
                <div className="flex bg-gradient-to-r from-orange-400 to-orange-600 px-4 py-2 rounded-t-xl justify-end items-start pt-2 mt-4">
                    <h1 className="text-xl md:text-3xl font-extrabold">DASHBOARD</h1>
                </div>
                <div className="flex flex-col justify-between  md:flex-row flex-wrap">


                    <div
                        onClick={() => setPage('projects')}
                        className="bg-slate-900 w-[100%] md:w-[32%] h-[200px] mt-4 p-4 rounded flex justify-between flex-col cursor-pointer hover:bg-slate-800 transition-all">
                        <h2 className="text-xl font-extrabold text-left">PROJETOS</h2>
                        {!projects ?
                            (<div>Carregando</div>)
                            : (
                                <span className="text-9xl font-extrabold text-gray-500 text-right">{projects.length}</span>
                            )}
                    </div>


                    <div
                        onClick={() => setPage('tasks')}
                        className="bg-slate-900 w-[100%] md:w-[32%] h-[200px] mt-4  p-4 rounded flex justify-between flex-col cursor-pointer hover:bg-slate-800 transition-all">
                        <h2 className="text-xl font-extrabold text-left">TAREFAS</h2>
                        {!tasks ?
                            (<div>Carregando</div>)
                            : (
                                <span className="text-9xl font-extrabold text-gray-500 text-right">{tasks.length}</span>
                            )}
                    </div>



                    <div
                        onClick={() => setPage('collaborators')}
                        className="bg-slate-900 w-[100%] md:w-[32%] h-[200px] mt-4  p-4 rounded flex justify-between flex-col cursor-pointer hover:bg-slate-800 transition-all">
                        <h2 className="text-xl font-extrabold text-left">COLABORADORES</h2>
                        <span className="text-9xl font-extrabold text-gray-500 text-right">{collaborators?.length}</span>
                    </div>

                    <div
                        className="bg-slate-900 w-[100%] md:w-[32%] h-[200px] mt-4  p-4 rounded flex justify-between flex-col cursor-pointer hover:bg-slate-800 transition-all ">
                        <h2 className="text-xl font-extrabold text-left">TEMPO GASTO HOJE (HH:MM)</h2>
                        <span className="text-5xl font-extrabold text-gray-500 text-right">{dayMinutes || '00:00'}</span>
                    </div>

                    <div className="hidden md:flex bg-slate-900 w-[100%] md:w-[32%] h-[200px] mt-4 rounded justify-center flex-col cursor-pointer hover:bg-slate-800 transition-all items-center">
                        <img
                            className="w-[80%]"
                            src="./assets/img/graphic.gif" alt="" />
                    </div>

                    <div
                        className="bg-slate-900 w-[100%] md:w-[32%] h-[200px] mt-4  p-4 rounded flex justify-between flex-col cursor-pointer hover:bg-slate-800 transition-all">
                        <h2 className="text-xl font-extrabold text-left">TEMPO GASTO NESTE MÊS (HH:MM)</h2>
                        <span className="text-5xl font-extrabold text-gray-500 text-right">{monthMinutes || '00:00'}</span>
                    </div>
                </div>


            </main>

        </>
    )
}

export default Dashboard
