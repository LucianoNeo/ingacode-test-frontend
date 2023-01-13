import { Resolver, useForm, Controller } from 'react-hook-form';
import { api } from '../services/Api';
import { useMyContext } from '../contexts/MyContext';
import { BiTask } from 'react-icons/bi';
import { format, parseISO, isBefore, isAfter } from 'date-fns';
import { toast, ToastContainer } from 'react-toastify';



interface FormData {
    name: string;
    description: string
    projectId: string
    startDate?: String | undefined
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
}

export default function CreateTaskModal({ visible, close }: Iprops) {
    const { setError, register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver });
    const { setProjects, projects, setTasks, setIsLoading, collaborators, setDayMinutes, setMonthMinutes, SuccessToast, ErrorToast } = useMyContext()


    async function createTask(data: FormData) {
        let interval
        if (data.startDate && data.endDate) {
            interval = (new Date(data.endDate).getTime() - new Date(String(data.startDate)).getTime()) / 60000;

        }
        const checkDay = await api.post('/daytotalminutes', { daySent: new Date(String(data.startDate)) })
        const currentDayHours = checkDay.data
        try {

            let [hours, minutes] = currentDayHours.split(":");
            let total_minutes = parseInt(hours) * 60 + parseInt(minutes);
            if (total_minutes >= 1440) {
                reset({ startDate: '', endDate: '' })
                setError("endDate", { type: "custom", message: 'Não é possível criar, limite de 24 horas atingido!' });
                return
            }
            if (interval && total_minutes + interval >= 1440) {
                reset({ startDate: '', endDate: '' })
                setError("endDate", { type: "custom", message: 'Não é possível criar, sua tarefa ultrapassa o limite de 24 horas!' });
                return
            } else {
                setIsLoading(true)
                const response = await api.post(`/tasks`, data)
                if (response.data) {

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
                        resetFields()
                        SuccessToast('Tarefa criada com sucesso!')
                    }
                } else {
                    ErrorToast(response.data.error)
                }


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
            const currentDate = new Date()

            const parsedstartDate = parseISO(String(data.startDate));
            const parsedendDate = parseISO(String(data.endDate));
            const parsedCurrentDate = format(currentDate, "yyyy-MM-dd HH:mm:ss");
            const now = parseISO(parsedCurrentDate);

            if (isAfter(parsedstartDate, parsedendDate)) {
                return setError("startDate", { type: "custom", message: 'O início da tarefa deve ser MENOR que o Fim' });
            }

            if (isBefore(parsedstartDate, now)) {
                return setError("startDate", { type: "custom", message: 'Inicio não pode ser menor que a data atual!' });
            }
            if (data.startDate === "") {
                data.startDate = undefined;
            } else {
                data.startDate = format(parsedstartDate, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
            }
            if (data.endDate === "") {
                data.endDate = undefined;
            } else {
                data.endDate = format(parsedendDate, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
            }
            if (data.collaboratorId === "Escolha o Colaborador") {
                data.collaboratorId = null;
            }

            createTask(data)

        } catch (error: any) {
            toast.error(error, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    };


    return (
        <>
            <ToastContainer />
            <div className={`${!visible && 'hidden'} w-screen h-screen bg-black bg-opacity-80 backdrop:blur-3xl flex items-center justify-center z-50 absolute top-0 left-0`}>
                <div className="bg-slate-900 w-[90vw] md:w-[40vw] min-w-[350px] px-8 py-2 rounded-md justify-between flex flex-col">
                    <form
                        className='w-full items-center justify-center'
                        onSubmit={handleSubmit(onSubmit)}>
                        <div className='flex w-full justify-between pt-4'>
                            <BiTask size={28} />
                            <h1 className='mb-4 font-extrabold text-xl'>Criar Tarefa:</h1>

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
                                <option >Escolha o Projeto</option>
                                {projects!.map((project: any) => (
                                    <option key={project.id} value={project.id}>
                                        {project.name}
                                    </option>
                                ))}

                            </select>
                            {errors?.projectId && <p className='text-red-700 text-center font-bold '>{errors.projectId.message}</p>}

                        </label>

                        <label>
                            Colaborador?
                            <select
                                className="px-4 py-2 rounded bg-black w-full"
                                {...register("collaboratorId")} >
                                <option >Escolha o Colaborador</option>
                                {collaborators?.map((colab) => (
                                    <option key={colab?.id} value={String(colab.id)}>
                                        {colab?.name}
                                    </option>
                                ))}

                            </select>
                        </label>

                        <label>
                            Início:
                            <input
                                type='datetime-local'
                                className="px-4 py-2 rounded bg-black w-full"
                                {...register("startDate")} />
                            {errors?.startDate && <p className='text-red-700 text-center font-bold '>{errors.startDate.message}</p>}
                        </label>
                        <label>
                            Fim:
                            <input
                                type='datetime-local'
                                className="px-4 py-2 rounded bg-black w-full"
                                {...register("endDate")} />
                            {errors?.endDate && <p className='text-red-700 text-center font-bold '>{errors.endDate.message}</p>}
                        </label>
                        <div className='flex items-center justify-center p-4 gap-2 mt-1'>
                            <button type='submit' className="bg-orange-600 px-4 w-22 flex justify-center rounded hover:opacity-80">
                                CRIAR
                            </button>
                            <button
                                onClick={() => {
                                    close()
                                    resetFields()
                                }
                                }
                                className="bg-red-600 px-2 max-w-22 flex justify-center rounded hover:opacity-80">
                                CANCELAR
                            </button>

                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
