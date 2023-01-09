import { IoMdAddCircle } from 'react-icons/io'
import ColabCard from './ColabCard';

interface Iprops {
    username: string;
    close: boolean,
    setClose: Function
}

function Collaborators() {

    return (
        <>
            <main className="text-white flex h-90% flex-col w-[90%] md:w-[80%] text-end ml-12 md:mx-auto overflow-auto pb-10 bg-slate-900 md:mt-4">
                <div className="flex bg-gradient-to-r from-orange-400 to-orange-600 h-20 px-4 rounded-t-xl justify-end items-start pt-4">
                    <h1 className="text-xl md:text-3xl font-extrabold">COLABORADORES</h1>
                </div>
                <ColabCard username='luciano' tasks={5} />
                <ColabCard username='henrique' tasks={5} />
                <ColabCard username='erica' tasks={5} />


            </main>

        </>
    )
}

export default Collaborators
