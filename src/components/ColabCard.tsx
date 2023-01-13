
interface Iprops {
    username: string | null
    tasks: number

}

function ColabCard({ username, tasks }: Iprops) {
    return (
        <div className="flex flex-col justify-evenly flex-wrap p-1 mx-auto gap-4">
            <div className="bg-slate-800 w-72 md:w-96 h-28 rounded-xl flex p-4 justify-evenly items-center ">
                <div className="flex w-full justify-between">
                    <img className='w-[70px] md:w-[70px]' src="./assets/img/user-img.png" alt="" />
                    <div className='flex flex-col overflow-hidden'>
                        <span className="font-extrabold uppercase text-xl w-36 text-start">{username}</span>
                        <div className='flex items-center gap-4'>
                            <p className='text-xs'>Tarefas:</p>
                            <p className="font-bold text-4xl text-gray-400">{tasks}</p>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default ColabCard