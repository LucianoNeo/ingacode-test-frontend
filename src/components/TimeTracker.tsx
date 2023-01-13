
import { format, isAfter, parseISO } from 'date-fns'
import { useState } from 'react'
import { AiFillDelete } from 'react-icons/ai'
import { BiTime } from 'react-icons/bi'
import { IoMdAddCircle } from 'react-icons/io'
import { ToastContainer } from 'react-toastify'
import { useMyContext } from '../contexts/MyContext'
import { api } from '../services/Api'
import { formatDate } from '../tools/formatDate'
import AddCollab from './AddCollab'
import DeleteTTModal from './DeleteTTModal'




interface Iprops {
    collaborator?: { name: string; }
    startDate?: string
    endDate?: string
    id: string
    number: number
}



function TimeTracker({ collaborator, endDate, startDate, id, number }: Iprops) {
    const [deleteTTVisible, setdeleteTTVisible] = useState(false)
    const [addCollabVisible, setaddCollabVisible] = useState(false)

    const { setTasks, setProjects, setIsLoading, setDayMinutes, setMonthMinutes, SuccessToast, ErrorToast } = useMyContext()

    function closeModal() {
        setdeleteTTVisible(false)
        setaddCollabVisible(false)
    }

    async function startTT() {
        try {
            const now = new Date()
            const startDate = format(now, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
            setIsLoading(true)
            const response = await api.put(`/timetrackers/${id}`, { startDate: startDate })
            if (response.data) {
                const update = await api.get('/tasks')
                setTasks(update.data)
                setIsLoading(false)
                SuccessToast('Timetracker iniciado com sucesso!')
            } else {
                ErrorToast(response.data.error)
            }

        } catch (error) {
            setIsLoading(false)
            ErrorToast(error)
        }
    }

    async function endTT(start: string) {
        try {
            const now = new Date();
            const endDate = format(now, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
            const startDate = parseISO(start);

            if (isAfter(startDate, now)) {
                ErrorToast('Não é possível finalizar o timetracker antes do início!')
            } else {
                setIsLoading(true);
                const response = await api.put(`/timetrackers/${id}`, { endDate: endDate });
                if (response.data) {
                    const updateTasks = await api.get('/tasks');
                    setTasks(updateTasks.data);

                    const updateProjects = await api.get('/projects');
                    setProjects(updateProjects.data);

                    const updateDayMinutes = await api.post('/daytotalminutes', { daySent: new Date() });
                    setDayMinutes(updateDayMinutes.data);

                    const updateMonthMinutes = await api.get('/monthtotalminutes');
                    setMonthMinutes(updateMonthMinutes.data);

                    if (updateTasks.data) {
                        setIsLoading(false);
                        SuccessToast('Timetracker finalizado com sucesso!')
                    }
                } else {
                    ErrorToast(response.data.error)
                }

            }
        } catch (error) {
            setIsLoading(false);
            ErrorToast(error)
        }
    }


    return (
        <>
            <ToastContainer />
            <DeleteTTModal id={id} close={closeModal} visible={deleteTTVisible} />
            <AddCollab id={id} close={closeModal} visible={addCollabVisible} />
            <div className="text-xs text-start bg-[#0C0B10] py-5 mt-2 rounded-xl gap-2 px-4 flex flex-col justify-between relative min-w-[200px] h-40 ">

                <button
                    onClick={() => setdeleteTTVisible(true)}
                    className="absolute right-3 top-3 hover:text-red-600">
                    <AiFillDelete size={15} />
                </button>
                <div className='flex items-center gap-2 self-center' >
                    <BiTime size={28} />
                    <span>{number}</span>
                </div>
                <div className="flex justify-between items-center w-full mx-2">
                    <p>Início:</p>
                    {startDate ? <p>{formatDate(String(startDate))}</p> :
                        <button
                            onClick={() => startTT()}
                            className="bg-orange-700 py-1 px-3 w-20 rounded">Iniciar</button>}

                </div>
                <div className="flex justify-between items-center w-full mx-2">
                    <p>Fim:</p>
                    {endDate && <p>{formatDate(String(endDate))}</p>}
                    {startDate && !endDate &&
                        <button
                            onClick={() => endTT(String(startDate))}
                            className='bg-red-700 py-1 px-1 w-20 rounded disabled:opacity-30'>Finalizar</button>
                    }


                </div>
                <div className='flex justify-between items-center w-full mx-2'>
                    <p >Colaborador:</p>
                    {collaborator ?
                        <div className="bg-gray-400 text-center py-1 px-1 w-20 p-1 rounded text-slate-900">
                            <p>{collaborator.name}</p>
                        </div>
                        :
                        <button
                            onClick={() => setaddCollabVisible(true)}
                            className='hover:text-orange-600'><IoMdAddCircle size={20} /></button>
                    }
                </div>
            </div>

        </>
    )
}

export default TimeTracker