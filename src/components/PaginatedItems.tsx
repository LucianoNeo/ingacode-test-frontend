import { format, utcToZonedTime } from 'date-fns-tz';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useMyContext } from '../contexts/MyContext';

function Items({ currentItems }) {

    const { filter, filterBy } = useMyContext()

    function filterByTaskName(item) {
        return item.name.toLowerCase().includes(filter.toLowerCase())
    }

    function filterByProjectName(item) {
        return item.project.name.toLowerCase().includes(filter.toLowerCase())
    }

    function filterByCollaborator(item) {
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
                return currentItems.filter((item) => filterByTaskName(item))

            case 'project':
                return currentItems.filter((item) => filterByProjectName(item))

            case 'collaborator':
                return currentItems.filter((item) => filterByCollaborator(item))
            default:
                break;
        }

    }



    let filtered = selectFilter()

    if (!currentItems) return <h1>Carregando...</h1>
    return (

        <div className='overflow-x-auto w-full text-center justify-center items-center my-4'        >

            <table className='text-white bg-[#1E293B] text-xs text-center self-center w-full'>
                <tbody>
                    <tr className='w-full px-1'>
                        <th className='text-[10px] md:text-sm  md:p-4 border-[1px] truncate'>Tarefa</th>
                        <th className='text-[10px] md:text-sm md:p-4 border-[1px] truncate'>Projeto</th>
                        <th className='text-[10px] md:text-sm  md:p-4 border-[1px] truncate'>Colaborador(es)</th>

                    </tr>
                    {filtered &&
                        filtered.map((item, index) => (
                            <tr key={index} className=' border-white '>
                                <td className='px-4 text-xs'>{item.name}</td>
                                <td className='px-4 text-xs'>{item.project.name}</td>

                                {item.TimeTracker.map((item, index) =>
                                    !item.collaborator ?
                                        (<td key={index} className='px-4 text-xs flex text-center justify-center gap-2'></td>)
                                        :
                                        (<td key={index} className='text-xs flex text- justify-center gap-2'>{item.collaborator.name}</td>)
                                )}


                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
}

export default function PaginatedItems({ itemsPerPage, items }) {
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = items.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(items.length / itemsPerPage);


    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;
        setItemOffset(newOffset);
    };

    return (
        <>
            <Items currentItems={currentItems} />
            <ReactPaginate
                breakLabel="..."
                nextLabel="Próximo >"
                className='text-xs text-center flex gap-2 m-auto'
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="< Anterior"


            />
        </>
    );
}


{/* <td className='px-4 text-xl'>{format(utcToZonedTime(item.inicio, 'America/Sao_Paulo'), 'HH:mm', { timeZone: 'America/Sao_Paulo' })}</td>
<td className='px-4 text-xl'>{format(utcToZonedTime(item.fim, 'America/Sao_Paulo'), 'HH:mm', { timeZone: 'America/Sao_Paulo' })}</td> */}
