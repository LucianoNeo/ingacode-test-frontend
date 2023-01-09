
interface Iprops {
    username: string;
    close: boolean,
    setClose: Function
}

function Projects() {

    return (
        <>
            <main className="text-white flex h-screen flex-col w-[90%] md:w-[80%] text-end ml-12 md:mx-auto overflow-auto pb-10 bg-slate-900 md:mt-4">
                <div className="flex bg-gradient-to-r from-orange-400 to-orange-600 h-20 px-4 rounded-t-xl justify-end items-start pt-4">
                    <h1 className="text-xl md:text-3xl font-extrabold">PROJETOS</h1>
                </div>
                <div className="flex flex-col justify-between  md:flex-row flex-wrap">

                </div>


            </main>

        </>
    )
}

export default Projects
