import { IoMdAddCircle } from "react-icons/io"

interface Iprops {
    username: string
    tasks: number

}

function ColabCard({ username, tasks }: Iprops) {
    return (
        <div className="flex flex-col justify-center flex-wrap p-4 mx-auto gap-4">
            <div className="bg-slate-800 w-80 md:w-96 h-28 rounded-xl flex p-4 justify-evenly items-center">
                <div className="flex items-center gap-4">
                    <img className='w-[70px] md:w-[70px]' src="./assets/img/user-img.png" alt="" />
                    <div className='flex flex-col w-28 overflow-hidden'>
                        <span className="font-extrabold uppercase text-xl w-28 text-start">{username}</span>
                        <div className='flex items-center gap-4'>
                            <p className='text-xs'>Tarefas:</p>
                            <p className="font-bold text-4xl text-green-700">{tasks}</p>
                        </div>

                    </div>
                </div>
                <div className='flex flex-col text-center items-center hover:text-orange-600 gap-2'>
                    <span className='text-xs'>Atribuir Tarefa:</span>
                    <button>
                        <IoMdAddCircle size={36} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ColabCard