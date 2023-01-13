import { useMyContext } from "../contexts/MyContext";

export default function Loading() {

    const { isLoading } = useMyContext()

    return (
        <div className={`${!isLoading && 'hidden'} w-screen h-screen bg-black bg-opacity-80 backdrop:blur-3xl flex items-center justify-center z-[55] absolute top-0 left-0`}>
            <div>CARREGANDO ...</div>
        </div>
    );
}
