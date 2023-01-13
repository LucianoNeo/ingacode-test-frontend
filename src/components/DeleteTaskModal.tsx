import { api } from "../services/Api"
import { GoAlert } from 'react-icons/go'
import { useMyContext } from "../contexts/MyContext"
interface Iprops {

    visible: boolean
    close: Function
    name: string
    id: string
}

export default function DeleteTaskModal({ visible, close, id, name }: Iprops) {
    const { setProjects, setTasks, setIsLoading } = useMyContext()

    async function deleteTask() {

        try {
            setIsLoading(true)
            const response = await api.delete(`/tasks/${id}`)
            console.log(response.data)
            const updateTasks = await api.get('/tasks')
            setTasks(updateTasks.data)
            const updateProjects = await api.get('/projects')
            setProjects(updateProjects.data)
            setIsLoading(false)
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
    }

    return (
        <div className={`${!visible && 'hidden'} w-screen h-screen bg-black bg-opacity-80 backdrop:blur-3xl flex items-center justify-center z-50 absolute top-0 left-0`}>
            <div className="bg-slate-900 w-64 h-64 p-6 rounded-md justify-between flex flex-col">
                <div className="flex items-center justify-center">
                    <GoAlert size={56} />
                    <h1>CONFIRMAÇÃO DE EXCLUSÃO</h1>
                </div>
                <div className="flex flex-col items-center text-xs mb-8">
                    <span>Deseja excluir a tarefa</span>
                    <span className="uppercase font-extrabold text-lg text-center">{name}</span>
                    <span> e todos os seus timetrackers?</span>
                </div>

                <div className="flex justify-evenly font-bold">
                    <button
                        onClick={() => {
                            deleteTask()
                            close()
                        }
                        }
                        className="bg-red-600 px-4 w-22 flex justify-center rounded hover:opacity-80">
                        EXCLUIR
                    </button>
                    <button
                        onClick={() => close()}
                        className="bg-orange-600 px-2 max-w-22 flex justify-center rounded hover:opacity-80">
                        CANCELAR
                    </button>
                </div>
            </div>
        </div>
    );
}
