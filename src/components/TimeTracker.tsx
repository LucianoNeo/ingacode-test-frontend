import { BiTask, BiTime } from 'react-icons/bi'

interface Iprops {
    size: string
}

function TimeTracker() {
    return (
        <div className="text-xs text-start bg-[#0C0B10] py-5 mt-2 rounded-xl gap-2 px-4 flex flex-col justify-between">
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
        </div>
    )
}

export default TimeTracker