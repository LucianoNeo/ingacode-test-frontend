import TaskCard from "./TaskCard";

interface Iprops {
    username: string;
    close: boolean,
    setClose: Function
}

function Tasks() {

    return (
        <>
            <main className="text-white flex h-[85vh] flex-col w-[85%] md:w-[90%] text-end ml-12 md:mx-auto overflow-hidden bg-slate-900 md:mt-4">
                <div className="flex bg-gradient-to-r from-orange-400 to-orange-600 h-12 px-4 rounded-t-xl justify-end items-start pt-2">
                    <h1 className="text-xl md:text-3xl font-extrabold">TAREFAS</h1>
                </div>
                <div className="flex flex-row overflow-auto items-start justify-start overflow-y-hidden">
                    <TaskCard name="Fazer relatório" collaborator='Luciano' project='Montar Tela de Login' description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Praesentium quas accusamus id magnam suscipit, assumenda, cupiditate provident numquam placeat accusantium harum delectus cumque qui at quasi dignissimos dicta beatae explicabo?" />
                    <TaskCard name="Fazer relatório" collaborator='Luciano' project='Montar Tela de Login' description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Praesentium quas accusamus id magnam suscipit, assumenda, cupiditate provident numquam placeat accusantium harum delectus cumque qui at quasi dignissimos dicta beatae explicabo?" />
                    <TaskCard name="Fazer relatório" collaborator='Luciano' project='Montar Tela de Login' description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Praesentium quas accusamus id magnam suscipit, assumenda, cupiditate provident numquam placeat accusantium harum delectus cumque qui at quasi dignissimos dicta beatae explicabo?" />
                </div>


            </main>

        </>
    )
}

export default Tasks
