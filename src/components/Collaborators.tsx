import { IoMdAddCircle } from 'react-icons/io'
import { useMyContext } from '../contexts/MyContext';
import ColabCard from './ColabCard';



function Collaborators() {
    const { collaborators, tasks } = useMyContext()

    function countTasksByCollaborator(collab) {
        let taskCounts = 0
        tasks.forEach(task => {
            task.TimeTracker.forEach(tracker => {
                if (tracker.collaborator) {
                    if (tracker.collaborator.name === collab) {
                        taskCounts += 1;
                    }
                }
            });
        });
        return taskCounts;
    }



    return (
        <>
            <main className="text-white flex h-[85vh] flex-col w-[85%] md:w-[90%] text-end ml-12 md:mx-auto overflow-hidden bg-slate-900 md:mt-4">
                <div className="flex bg-gradient-to-r from-orange-400 to-orange-600 px-4 py-2 rounded-t-xl justify-end items-start pt-2">
                    <h1 className="text-xl md:text-3xl font-extrabold">COLABORADORES</h1>
                </div>
                <div className='flex flex-col h-full w-full my-8'>
                    {collaborators!.map((collab) => (
                        <ColabCard key={collab.id} username={collab.name} tasks={countTasksByCollaborator(collab.name)} />
                    ))}

                </div>


            </main>

        </>
    )
}

export default Collaborators
