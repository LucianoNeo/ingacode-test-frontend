
interface Iprops {

    setPage: Function
}

function Dashboard({ setPage }: Iprops) {

    return (
        <>
            <main className="text-white flex h-screen flex-col w-[90%] md:w-[80%] text-end px-4 ml-10 md:mx-auto overflow-auto pb-10">
                <div className="flex bg-gradient-to-r from-orange-400 to-orange-600 h-20 mt-4 px-4 rounded justify-end items-start pt-4">
                    <h1 className="text-xl md:text-3xl font-extrabold">DASHBOARD</h1>
                </div>
                <div className="flex flex-col justify-between  md:flex-row flex-wrap">
                    <div
                        onClick={() => setPage('projects')}
                        className="bg-slate-900 w-[100%] md:w-[32%] h-[200px] mt-4 p-4 rounded flex justify-between flex-col cursor-pointer hover:bg-slate-800 transition-all">
                        <h2 className="text-xl font-extrabold text-left">PROJETOS</h2>
                        <span className="text-9xl font-extrabold text-gray-500 text-right">3</span>
                    </div>

                    <div
                        onClick={() => setPage('tasks')}
                        className="bg-slate-900 w-[100%] md:w-[32%] h-[200px] mt-4  p-4 rounded flex justify-between flex-col cursor-pointer hover:bg-slate-800 transition-all">
                        <h2 className="text-xl font-extrabold text-left">TAREFAS</h2>
                        <span className="text-9xl font-extrabold text-gray-500 text-right">5</span>
                    </div>

                    <div
                        onClick={() => setPage('collaborators')}
                        className="bg-slate-900 w-[100%] md:w-[32%] h-[200px] mt-4  p-4 rounded flex justify-between flex-col cursor-pointer hover:bg-slate-800 transition-all">
                        <h2 className="text-xl font-extrabold text-left">COLABORADORES</h2>
                        <span className="text-9xl font-extrabold text-gray-500 text-right">3</span>
                    </div>

                    <div
                        className="bg-slate-900 w-[100%] md:w-[32%] h-[200px] mt-4  p-4 rounded flex justify-between flex-col cursor-pointer hover:bg-slate-800 transition-all ">
                        <h2 className="text-xl font-extrabold text-left">TEMPO GASTO HOJE</h2>
                        <span className="text-5xl font-extrabold text-gray-500 text-right">03h:20m</span>
                    </div>

                    <div className="hidden md:flex bg-slate-900 w-[100%] md:w-[32%] h-[200px] mt-4 rounded justify-center flex-col cursor-pointer hover:bg-slate-800 transition-all items-center">
                        <img
                            className="w-[80%]"
                            src="./assets/img/graphic.gif" alt="" />
                    </div>

                    <div
                        className="bg-slate-900 w-[100%] md:w-[32%] h-[200px] mt-4  p-4 rounded flex justify-between flex-col cursor-pointer hover:bg-slate-800 transition-all">
                        <h2 className="text-xl font-extrabold text-left">TEMPO GASTO NESTE MÊS</h2>
                        <span className="text-5xl font-extrabold text-gray-500 text-right">17h:20m</span>
                    </div>
                </div>


            </main>

        </>
    )
}

export default Dashboard
