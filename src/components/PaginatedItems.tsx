import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { ClipLoader } from 'react-spinners';
import { useMyContext } from '../contexts/MyContext';
import { api } from '../services/Api';

function Items({ currentItems }: any) {
    const { filter, filterBy } = useMyContext()
    const [taskTime, setTaskTime] = useState(Array(currentItems.length).fill(""))
    const [isLoading, setIsLoading] = useState(true)


    function filterByTaskName(item: any) {
        return item.name.toLowerCase().includes(filter.toLowerCase())
    }

    function filterByProjectName(item: any) {
        return item.project.name.toLowerCase().includes(filter.toLowerCase())
    }

    function filterByCollaborator(item: any) {
        {/* @ts-ignore */ }
        return item.TimeTracker.some(tracker => {
            if (tracker.collaborator) {
                return tracker.collaborator.name.toLowerCase().includes(filter.toLowerCase());
            } else {
                return false;
            }
        });
    }

    function selectFilter() {
        switch (filterBy) {
            case 'task':
                return currentItems.filter((item: any) => filterByTaskName(item))

            case 'project':
                return currentItems.filter((item: any) => filterByProjectName(item))

            case 'collaborator':
                return currentItems.filter((item: any) => filterByCollaborator(item))
            default:
                break;
        }

    }

    const getData = async (taskId: any) => {
        const res = await api.get(`/tasktotalminutes/${taskId}`)
        let totalHours = Math.floor(res.data / 60)
        let totalMinutes = Math.floor(res.data % 60)
        /* @ts-ignore*/
        if (totalHours < 9) totalHours = (String('0' + totalHours))
        /* @ts-ignore*/
        if (totalMinutes < 9) totalMinutes = (String('0' + totalMinutes))
        return totalHours + ':' + totalMinutes
    }




    useEffect(() => {
        currentItems.forEach((item: any, index: number) => {
            getData(item.id).then(res => {
                setTaskTime(prevState => {
                    const newState = [...prevState]
                    newState[index] = res
                    return newState
                })
            })
            setTimeout(() => {
                setIsLoading(false)
            }, 500);
        })
    }, [currentItems])



    let filtered = selectFilter()

    if (!currentItems) return <h1>Carregando...</h1>
    return (

        <div className='overflow-x-auto w-full text-center justify-center items-center my-4'        >

            <table className='text-white bg-[#1E293B] text-xs  md:text-sm text-center self-center w-full'>
                <tbody>
                    <tr className='w-full px-1'>
                        <th className='text-[10px] md:text-sm  md:p-4 border-[1px] truncate'>Tarefa</th>
                        <th className='text-[10px] md:text-sm md:p-4 border-[1px] truncate'>Projeto</th>
                        <th className='text-[10px] md:text-sm  md:p-4 border-[1px] truncate'>Colaborador(es)</th>
                        <th className='text-[10px] md:text-sm  md:p-4 border-[1px] truncate'>Tempo aportado</th>

                    </tr>
                    {filtered &&
                        filtered.map((item: any, index: any) => (

                            <tr key={index} className=' border-white '>
                                <td className='px-4 text-xs md:text-sm'>{item.name}</td>
                                <td className='px-4 text-xs md:text-sm'>{item.project.name}</td>

                                {item.TimeTracker.map((item: any, index: any) =>
                                    !item.collaborator ?
                                        (<td key={index} className='px-4 text-xs  md:text-sm flex text-center justify-center gap-2'></td>)
                                        :
                                        (<td key={index} className='text-xs md:text-sm flex text- justify-center gap-2'>{item.collaborator.name}</td>)
                                )}

                                <td className='px-4 text-xs md:text-sm'>
                                    {!isLoading ? taskTime[index]
                                        :
                                        <ClipLoader size={10} color="#e58b15" />}</td>


                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
}
interface IperPage {
    itemsPerPage: number,
    items: any
}


export default function PaginatedItems({ itemsPerPage, items }: IperPage) {
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = items.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(items.length / itemsPerPage);


    const handlePageClick = (event: any) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;
        setItemOffset(newOffset);
    };

    return (
        <>
            <Items currentItems={currentItems} />
            <ReactPaginate
                breakLabel="..."
                nextLabel="Próximo >"
                className='text-xs text-center flex gap-2 m-auto  md:text-sm'
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="< Anterior"


            />
        </>
    );
}
