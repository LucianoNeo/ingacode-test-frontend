import { Resolver, useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import { useMyContext } from '../contexts/MyContext';
import { api } from '../services/Api';

interface FormData {
    name: string;
}



const resolver: Resolver<FormData> = async (values) => {
    return {
        values: values.name ? values : {},
        errors: !values.name
            ? {
                name: {
                    type: 'required',
                    message: 'Este campo é obrigatório',
                },

            }
            : values.name.length > 250
                ? {
                    name: {
                        type: 'maxLength',
                        message: 'O nome do projeto não pode ter mais do que 250 caracteres',
                    },
                }
                : {},
    };
};

interface Iprops {

    visible: boolean
    close: Function
}

export default function CreateProjectModal({ visible, close }: Iprops) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver });
    const { setProjects, setIsLoading, SuccessToast, ErrorToast } = useMyContext()

    async function createProject(data: FormData) {
        try {
            setIsLoading(true)
            const response = await api.post(`/projects`, data)
            if (response.data) {
                const update = await api.get('/projects')
                setProjects(update.data)
                if (update.data) {
                    setIsLoading(false)
                }
                SuccessToast('Projeto criado com sucesso!')

            } else {
                ErrorToast(response.data.error)
            }

        } catch (error: any) {

            setIsLoading(false)
            ErrorToast(error)
        }
    }



    const onSubmit = (data: FormData) => {
        createProject(data)
        close();
    };


    return (
        <>
            <ToastContainer />
            <div className={`${!visible && 'hidden'} w-screen h-screen bg-black bg-opacity-80 backdrop:blur-3xl flex items-center justify-center z-50 absolute top-0 left-0`}>
                <div className="bg-slate-900 w-64 p-4 rounded-md justify-between flex flex-col">
                    <form
                        className='w-full items-center justify-center'
                        onSubmit={handleSubmit(onSubmit)}>
                        <label>
                            Criar Projeto:
                            <input
                                className="px-4 py-2 rounded bg-black w-full mt-4"
                                {...register("name")} placeholder="Nome do Projeto" />
                            {errors?.name && <p className='text-red-700 text-center font-bold mt-2'>{errors.name.message}</p>}
                        </label>
                        <div className='flex items-center justify-center p-4 gap-2 mt-8'>
                            <button type='submit' className="bg-orange-600 px-4 w-22 flex justify-center rounded hover:opacity-80">
                                CRIAR
                            </button>
                            <button
                                onClick={() => {
                                    close()
                                    reset({ name: '' })
                                }
                                }
                                className="bg-red-600 px-2 max-w-22 flex justify-center rounded hover:opacity-80">
                                CANCELAR
                            </button>

                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
