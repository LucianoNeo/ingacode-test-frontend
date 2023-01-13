import moment from 'moment'
import { useState } from 'react'
import { AiFillDelete } from 'react-icons/ai'
import { BiEdit, BiTask, BiTime } from 'react-icons/bi'
import { IoMdAddCircle } from 'react-icons/io'
import { useMyContext } from '../contexts/MyContext'
import { api } from '../services/Api'
import { formatDate } from '../tools/formatDate'
import AddCollab from './AddCollab'
import DeleteTTModal from './DeleteTTModal'

interface Iprops {
    collaborator?: { name: string; }
    startDate?: String
    endDate?: String
    id: string
    number: number
}



function TimeTracker({ collaborator, endDate, startDate, id, number }: Iprops) {
    const [deleteTTVisible, setdeleteTTVisible] = useState(false)
    const [addCollabVisible, setaddCollabVisible] = useState(false)

    const { setTasks, token, setIsLoading } = useMyContext()

    function closeModal() {
        setdeleteTTVisible(false)
        setaddCollabVisible(false)
    }

    async function startTT() {
        try {

            const now = new Date()
            const startDate = moment(now).toISOString();
            setIsLoading(true)
            const response = await api.put(`/timetrackers/${id}`, { startDate: startDate })
            console.log(response.data)
            const update = await api.get('/tasks')
            setTasks(update.data)
            setIsLoading(false)

        } catch (error) {
            console.log(error);
            setIsLoading(false)
        }
    }

    async function endTT(start) {
        try {
            const now = new Date()
            const endDate = moment(now).toISOString();
            if (moment(start).isAfter(endDate)) {
                return alert('isso nao eh possible!')
            } else {

                setIsLoading(true)
                const response = await api.put(`/timetrackers/${id}`, { endDate: endDate })
                console.log(response.data)
                const update = await api.get('/tasks')
                setTasks(update.data)
                setIsLoading(false)
            }
        } catch (error) {
            console.log(error);
            setIsLoading(false)
        }
    }


    return (
        <>

            <div className="text-xs text-start bg-[#0C0B10] py-5 mt-2 rounded-xl gap-2 px-4 flex flex-col justify-between relative min-w-[200px] h-40">

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
                    {startDate ? <p>{formatDate(startDate)}</p> :
                        <button
                            onClick={() => startTT()}
                            className="bg-orange-700 py-1 px-3 w-20 rounded">Iniciar</button>}

                </div>
                <div className="flex justify-between items-center w-full mx-2">
                    <p>Fim:</p>
                    {endDate && <p>{formatDate(endDate)}</p>}
                    {startDate && !endDate &&
                        <button
                            onClick={() => endTT(startDate)}
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
            <DeleteTTModal id={id} close={closeModal} visible={deleteTTVisible} />
            <AddCollab id={id} close={closeModal} visible={addCollabVisible} />
        </>
    )
}

export default TimeTracker