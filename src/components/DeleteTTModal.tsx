import { api } from "../services/Api"
import { GoAlert } from 'react-icons/go'
import { useMyContext } from "../contexts/MyContext"
import { useState } from "react"

interface Iprops {

    visible: boolean
    close: Function
    id: String
}

export default function DeleteTTModal({ visible, close, id }: Iprops) {
    const { token, setTasks, setIsLoading } = useMyContext()


    async function deleteTT() {
        try {
            setIsLoading(true)
            const response = await api.delete(`/timetrackers/${id}`)
            console.log(response.data)
            const update = await api.get('/tasks')
            setTasks(update.data)
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
        }
    }

    return (
        <div className={`${!visible && 'hidden'} bg-black w-full h-full bg-opacity-90 backdrop:blur-3xl flex items-center z-40 justify-center absolute top-0 left-0 text-xs`}>
            <div className="bg-slate-900 w-44 h-44 p-6 rounded-md justify-between flex flex-col">
                <div className="flex items-center justify-center">
                    <GoAlert size={56} />
                    <h1>CONFIRMAÇÃO DE EXCLUSÃO</h1>
                </div>
                <div className="flex flex-col items-center text-xs mb-8">
                    <span>Deseja excluir o timetracker?</span>
                </div>

                <div className="flex justify-evenly font-bold gap-1">
                    <button
                        onClick={() => {
                            deleteTT()
                            close()
                        }
                        }
                        className="bg-red-600 px-4 w-18 flex justify-center rounded hover:opacity-80">
                        EXCLUIR
                    </button>
                    <button
                        type="button"
                        onClick={() => close()}
                        className="bg-orange-600 px-2 w-18 flex justify-center rounded hover:opacity-80">
                        CANCELAR
                    </button>
                </div>
            </div>
        </div>
    );
}
