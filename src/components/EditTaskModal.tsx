import { Resolver, useForm, Controller } from 'react-hook-form';
import { api } from '../services/Api';
import { useMyContext } from '../contexts/MyContext';
import { BiEdit } from 'react-icons/bi';

interface FormData {
    name: string;
    id: string
    description: string
    projectId: string
    startDate?: string | undefined
    endDate?: string | undefined
    collaboratorId?: string | null
}


const resolver: Resolver<FormData> = async (values) => {
    return {
        values: values.name ? values : {},
        errors: !values.name
            ? {
                name: {
                    type: 'required',
                    message: 'Este campo é obrigatório',
                },
            }
            : values.name.length > 250
                ? {
                    name: {
                        type: 'maxLength',
                        message: 'O nome do projeto não pode ter mais do que 250 caracteres',
                    },
                }
                : !values.projectId || values.projectId === "Escolha o Projeto"
                    ? {
                        projectId: {
                            type: 'required',
                            message: 'Este campo é obrigatório',
                        },
                    }
                    : {},
    };
};



interface Iprops {

    visible: boolean
    close: Function
    name: string
    id: string
    description: string
    projectId: string
}

export default function EditTaskModal({ visible, close, name, id, projectId, description }: Iprops) {
    const { setError, register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
        resolver, defaultValues: {
            name, id, projectId, description
        }
    });

    const { setProjects, projects, setTasks, setIsLoading, setDayMinutes, dayMinutes, setMonthMinutes } = useMyContext()

    async function editTask(data: FormData, id: string) {
        console.log(data)
        try {
            setIsLoading(true)
            const response = await api.put(`/tasks/${id}`, data)
            console.log(response.data)

            const updateTasks = await api.get('/tasks')
            setTasks(updateTasks.data)

            const updateProjects = await api.get('/projects')
            setProjects(updateProjects.data)

            const updateDayMinutes = await api.post('/daytotalminutes', { daySent: new Date() })
            setDayMinutes(updateDayMinutes.data)

            const updateMonthMinutes = await api.get('/monthtotalminutes')
            setMonthMinutes(updateMonthMinutes.data)

            if (updateTasks.data) {
                setIsLoading(false)
                close();
            }
        } catch (error: any) {
            setIsLoading(false)
            return setError("endDate", { type: "custom", message: error.response.data.error });
        }
    }

    function resetFields() {
        reset({ name: '', description: '', projectId: 'Escolha o Projeto', collaboratorId: 'Escolha o Colaborador', startDate: '', endDate: '' })
    }

    const onSubmit = (data: FormData) => {
        try {
            editTask(data, id)
            close();

        } catch (error) {
            alert(error)
        }
    };
    return (
        <div className={`${!visible && 'hidden'} w-screen h-screen bg-black bg-opacity-80 backdrop:blur-3xl flex items-center justify-center z-50 absolute top-0 left-0`}>
            <div className="bg-slate-900 w-[90vw] md:w-[30vw] px-8 py-4 rounded-md justify-between flex flex-col">
                <form
                    className='w-full items-center justify-center text-left'
                    onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex w-full justify-between'>
                        <BiEdit size={24} />
                        <p className='text-lg font-extrabold'>Editar Tarefa:</p>

                    </div>
                    <label>
                        Nome:
                        <input
                            className="px-4 py-2 rounded bg-black w-full"
                            {...register("name")} placeholder="Nome da Tarefa" />
                        {errors?.name && <p className='text-red-700 text-center font-bold '>{errors.name.message}</p>}
                    </label>

                    <label>
                        Descrição:
                        <textarea
                            className="px-4 py-2 rounded bg-black w-full resize-none"
                            {...register("description")} placeholder="Descrição da Tarefa" />
                    </label>

                    <label>
                        Selecione um projeto:
                        <select
                            className="px-4 py-2 rounded bg-black w-full"
                            {...register("projectId")} >
                            <option disabled>Escolha o Projeto</option>
                            {projects!.map((project: any) => (
                                <option key={project.id} value={project.id}>
                                    {project.name}
                                </option>
                            ))}

                        </select>
                        {errors?.projectId && <p className='text-red-700 text-center font-bold '>{errors.projectId.message}</p>}

                    </label>

                    <div className='flex items-center justify-center p-4 gap-2 mt-2'>
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
