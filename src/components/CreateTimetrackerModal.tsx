
import { useForm } from 'react-hook-form';
import { useMyContext } from '../contexts/MyContext';
import { api } from '../services/Api';
import * as moment_ from 'moment';

const convertTime = moment_;

interface FormData {
    startDate?: string | undefined
    endDate?: string | undefined
    collaboratorId?: string | null
    taskId: string
}


interface Iprops {

    visible: boolean
    close: Function
    id: string
}

export default function CreateTimetrackerModal({ visible, close, id }: Iprops) {
    const { setError, register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();
    const { setProjects, setTasks, setIsLoading, collaborators, setDayMinutes, setMonthMinutes } = useMyContext()


    async function createTimetracker(data: FormData) {

        let interval
        if (data.startDate && data.endDate) {
            interval = (new Date(data.endDate).getTime() - new Date(data.startDate).getTime()) / 60000;
            console.log(interval)
        }
        const checkDay = await api.post('/daytotalminutes', { daySent: new Date(String(data.startDate)) })
        const currentDayHours = checkDay.data
        try {
            console.log(currentDayHours)
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
                const response = await api.post(`/timetrackers`, data)
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
                    resetFields()
                }
            }
        } catch (error: any) {
            setIsLoading(false)
            return setError("endDate", { type: "custom", message: error.response.data.error });
        }
    }
    function resetFields() {
        reset({ collaboratorId: 'Escolha o Colaborador', startDate: '', endDate: '' })
    }

    const onSubmit = (data: FormData) => {
        try {
            const currentDate = new Date()
            data.taskId = id
            const parsedstartDate = convertTime(data.startDate, "YYYY-MM-DD HH:mm:ss").toDate();
            const parsedendDate = convertTime(data.endDate, "YYYY-MM-DD HH:mm:ss").toDate();
            const parsedCurrentDate = convertTime(currentDate).format("YYYY-MM-DD HH:mm:ss")
            const now = convertTime(parsedCurrentDate, "YYYY-MM-DD HH:mm:ss").toDate();

            if (parsedstartDate.getTime() > parsedendDate.getTime()) {
                return setError("startDate", { type: "custom", message: 'O início da tarefa deve ser MENOR que o Fim' });
            }

            if (parsedstartDate < now) {
                return setError("startDate", { type: "custom", message: 'Inicio não pode ser menor que a data atual!' });
            }
            if (data.startDate === "") {
                data.startDate = undefined;
            } else {
                data.startDate = convertTime(data.startDate).toISOString();
            }
            if (data.endDate === "") {
                data.endDate = undefined;
            } else {
                data.endDate = convertTime(data.endDate).toISOString();
            }
            if (data.collaboratorId === "Escolha o Colaborador") {
                data.collaboratorId = null;
            }

            createTimetracker(data)

        } catch (error) {
            console.log(error)
        }
    };
    return (
        <div className={`${!visible && 'hidden'} w-screen h-screen bg-black bg-opacity-80 backdrop:blur-3xl flex items-center justify-center z-50 absolute top-0 left-0`}>
            <div className="bg-slate-900 w-[90vw] md:w-[30vw] min-w-[350px] px-8 py-8 rounded-md justify-between flex flex-col text-left">
                <form
                    className='w-full items-center justify-center'
                    onSubmit={handleSubmit(onSubmit)}>
                    <h1 className='mb-4 text-lg font-extrabold' >Criar Timetracker:</h1>

                    <label>
                        Colaborador?
                        <select
                            className="px-4 py-2 rounded bg-black w-full"
                            {...register("collaboratorId")} >
                            <option >Escolha o Colaborador</option>
                            {collaborators!.map((colab) => (
                                <option key={colab.id} value={String(colab.id)}>
                                    {colab.name}
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
                    <div className='flex items-center justify-center p-4 gap-2 mt-8'>
                        <button type='submit' className="bg-orange-600 px-4 w-22 flex justify-center rounded hover:opacity-80">
                            CRIAR
                        </button>
                        <button
                            type='button'
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
    );
}
