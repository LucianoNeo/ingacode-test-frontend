import { useEffect, useState } from "react"
import { useMyContext } from "../contexts/MyContext"
import PaginatedItems from "./PaginatedItems"
import { BiSearchAlt2 } from 'react-icons/bi'


function List() {
    const { setFilterBy, setFilter } = useMyContext()
    const { tasks } = useMyContext()
    const [openFilter, setOpenFilter] = useState(false)


    return (
        <>

            <main className="text-white flex h-[90vh] flex-col w-[90%] md:w-[80%] text-end px-4 ml-10 md:mx-auto overflow-auto pb-10 ">
                <div className="flex bg-gradient-to-r from-orange-400 to-orange-600 mt-4 px-4  py-2 rounded justify-end items-center">

                    <h1 className="text-xl md:text-3xl font-extrabold">RELATÓRIO</h1>
                </div>
                <div className={`${openFilter ? 'w-full' : 'w-14'} h-14 bg-slate-900 rounded-full items-center justify-between  transition-all text-xs px-2 overflow-hidden flex mt-4`}>
                    <button
                        onClick={() => setOpenFilter(!openFilter)}
                    >
                        <div className="translate-x-2">
                            <BiSearchAlt2 size={28} />
                        </div>
                    </button>
                    {openFilter &&
                        <div className="flex w-full justify-evenly">
                            <div className="flex flex-col md:flex-row text-left ml-6 md:items-center md:gap-4">
                                <span>Filtrar por:</span>
                                <select
                                    className="px-4 py-2 rounded bg-[#111] w-24 h-8 text-[9px]"
                                    onChange={(e) => setFilterBy(e.target.value)}>
                                    <option value='task'>Tarefa</option>
                                    <option value='project'>Projeto</option>
                                    <option value='collaborator'>Colaborador</option>
                                </select>

                            </div>
                            <div className="flex flex-col text-left ml-1 h-full items-center justify-center my-auto">

                                <input
                                    placeholder="Digite sua busca"
                                    type='text'
                                    className="px-4 py-2 rounded bg-[#111] w-[30vw] h-8 placeholder:text-[9px]"
                                    onChange={(e) => setFilter(e.target.value)} />

                            </div>
                        </div>
                    }


                </div>
                <div className="flex flex-col justify-between  md:flex-row flex-wrap">
                    <PaginatedItems itemsPerPage={10} items={tasks} />
                </div>


            </main>

        </>
    )
}

export default List
