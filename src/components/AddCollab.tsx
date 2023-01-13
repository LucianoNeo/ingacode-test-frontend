import { Resolver, useForm } from 'react-hook-form';
import { useMyContext } from '../contexts/MyContext';
import { api } from '../services/Api';

interface FormData {
    collaboratorId: string | null
}


interface Iprops {

    visible: boolean
    close: Function

    id: string
}

export default function AddCollab({ visible, close, id }: Iprops) {
    const { setError, register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const { setTasks, setIsLoading, collaborators } = useMyContext()

    async function addCollab(data: FormData, id: string) {
        console.log(data)
        try {
            if (!data.collaboratorId) {
                return setError("collaboratorId", { type: "custom", message: 'Você deve selecionar um colaborador para continuar!' });
            }
            setIsLoading(true)
            const response = await api.put(`/timetrackers/${id}`, data)
            console.log(response.data)
            const update = await api.get('/tasks')
            setTasks(update.data)
            setIsLoading(false)
        } catch (error) {
            console.log(error);
            setIsLoading(false)
        }
    }

    const onSubmit = (data: FormData) => {
        addCollab(data, id)
        close();

    };
    return (
        <div className={`${!visible && 'hidden'} w-full h-full bg-black bg-opacity-90 backdrop:blur-3xl flex items-center justify-center z-auto absolute top-0 left-0`}>
            <div className="bg-slate-900 w[80%] h-[60%] p-4 rounded-md flex flex-col">
                <form
                    className='w-full items-center justify-center text-start'
                    onSubmit={handleSubmit(onSubmit)}>
                    <p className='text-lg font-extrabold'>Adicionar Colaborador:</p>
                    <label className='mt-8'>

                        <select
                            className="px-4 py-2 rounded bg-black w-full mt-8"
                            {...register("collaboratorId")} >
                            {collaborators!.map((colab) => (
                                <option key={colab.id} value={String(colab.id)}>
                                    {colab.name}
                                </option>
                            ))}

                        </select>
                    </label>
                    {errors?.collaboratorId && <p className='text-red-700 text-center font-bold '>{errors.collaboratorId.message}</p>}
                    <div className='flex items-center justify-center p-4 gap-2 mt-8'>
                        <button type='submit' className="bg-orange-600 px-4 w-22 flex justify-center rounded hover:opacity-80">
                            CONFIRMAR
                        </button>
                        <button
                            type='button'
                            onClick={() => {
                                close()
                            }
                            }
                            className="bg-red-600 px-2 max-w-22 flex justify-center rounded hover:opacity-80">
                            CANCELAR
                        </button>

                    </div>
                </form>
            </div>
        </div>
    );
}
