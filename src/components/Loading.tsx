import { ScaleLoader } from "react-spinners";
import { useMyContext } from "../contexts/MyContext";

export default function Loading() {

    const { isLoading } = useMyContext()

    return (
        <div className={`${!isLoading && 'hidden'} w-screen h-screen bg-black bg-opacity-80 backdrop:blur-3xl flex items-center justify-center z-[55] absolute top-0 left-0`}>
            <div className="flex flex-col items-center justify-center">
                <ScaleLoader loading width={26} height={36} color="rgb(234 88 12)" />
                <h1>CARREGANDO ...</h1>
            </div>
        </div>
    );
}
