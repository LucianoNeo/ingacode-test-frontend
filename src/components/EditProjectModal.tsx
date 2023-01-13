import { Resolver, useForm } from 'react-hook-form';
import { useMyContext } from '../contexts/MyContext';
import { api } from '../services/Api';
import { BiEdit } from 'react-icons/bi'

interface FormData {
    name: string;
    id: string
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
    name: string
    id: string
}

export default function EditProjectModal({ visible, close, name, id }: Iprops) {
    const { setError, register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver, defaultValues: { name } });
    const { token, setProjects, setIsLoading } = useMyContext()

    async function editProject(data: FormData, id: string) {
        try {

            setIsLoading(true)
            const response = await api.put(`/projects/${id}`, data)
            console.log(response.data)
            const update = await api.get('/projects')
            setProjects(update.data)
            setIsLoading(false)

        } catch (error: any) {
            setIsLoading(false)
            return setError("name", { type: "custom", message: error.response.data.error });
        }
    }

    const onSubmit = (data: FormData) => {
        editProject(data, id)
        reset({ name: '' })
        close();

    };
    return (
        <div className={`${!visible && 'hidden'} w-screen h-screen bg-black bg-opacity-80 backdrop:blur-3xl flex items-center justify-center z-50 absolute top-0 left-0`}>
            <div className="bg-slate-900 w-64 p-4 rounded-md justify-between flex flex-col">
                <form
                    className='w-full items-center justify-center text-start'
                    onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex w-full justify-between'>
                        <BiEdit size={24} />
                        <p className='text-lg font-extrabold'>Editar Projeto:</p>

                    </div>
                    <label className='text-xs'>

                        <input
                            className="px-4 py-2 rounded bg-black w-full mt-4"

                            {...register("name")} placeholder="Nome do Projeto" />
                        {errors?.name && <p className='text-red-700 text-center font-bold mt-2'>{errors.name.message}</p>}
                    </label>
                    <div className='flex items-center justify-center p-4 gap-2 mt-4'>
                        <button type='submit' className="bg-orange-600 px-4 w-22 flex justify-center rounded hover:opacity-80">
                            CONFIRMAR
                        </button>
                        <button
                            type='button'
                            onClick={() => {
                                reset({ name: '' })
                                close()
                            }
                            }
                            className="bg-red-600 px-2 max-w-22 flex justify-center rounded hover:opacity-80">
                            CANCELAR
                        </button>

                    </div>
                </form>
            </div>
        </div>
    );
}
