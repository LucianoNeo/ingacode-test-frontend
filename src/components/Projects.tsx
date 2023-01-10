
interface Iprops {
    username: string;
    close: boolean,
    setClose: Function
}

function Projects() {

    return (
        <>
            <main className="text-white flex h-[85vh] flex-col w-[85%] md:w-[90%] text-end ml-12 md:mx-auto overflow-hidden bg-slate-900 md:mt-4">
                <div className="flex bg-gradient-to-r from-orange-400 to-orange-600 h-12 px-4 rounded-t-xl justify-end items-start pt-2">
                    <h1 className="text-xl md:text-3xl font-extrabold">PROJETOS</h1>
                </div>
                <div className="flex flex-row overflow-auto items-start justify-start overflow-y-hidden">

                </div>


            </main>

        </>
    )
}

export default Projects
