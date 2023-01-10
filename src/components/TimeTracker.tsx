import { AiFillDelete } from 'react-icons/ai'
import { BiEdit, BiTask, BiTime } from 'react-icons/bi'
import { IoMdAddCircle } from 'react-icons/io'

interface Iprops {
    collaborator?: string
}

function TimeTracker({ collaborator }: Iprops) {
    return (
        <div className="text-xs text-start bg-[#0C0B10] py-5 mt-2 rounded-xl gap-2 px-4 flex flex-col justify-between relative">
            <button className="absolute right-8 top-3 hover:text-orange-600">
                <BiEdit size={15} />
            </button>
            <button className="absolute right-3 top-3 hover:text-red-600">
                <AiFillDelete size={15} />
            </button>
            <div className='flex items-center gap-2 self-center' >
                <BiTime size={28} />
                <span>1</span>
            </div>
            <div className="flex justify-between items-center w-full mx-2">
                <p>Início:</p><button className="bg-orange-700 py-1 px-3 w-20 rounded">Iniciar</button>
            </div>
            <div className="flex justify-between items-center w-full mx-2">
                <p>Fim:</p>
                <button disabled className="bg-red-700 py-1 px-1 w-20 rounded disabled:opacity-30">Finalizar</button>
            </div>
            <div className='flex justify-between items-center w-full mx-2'>
                <p >Colaborador:</p>
                {collaborator ?
                    <div className="bg-gray-400 text-center py-1 px-1 w-20 p-1 rounded text-slate-900">
                        <p>{collaborator}</p>
                    </div>
                    :
                    <button className='hover:text-orange-600'><IoMdAddCircle size={20} /></button>
                }
            </div>
        </div>
    )
}

export default TimeTracker