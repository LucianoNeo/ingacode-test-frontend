import { createContext, useContext } from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';


interface User {
    username: string
    password: string
}

interface ContextData {
    token: string | null
    setToken: Function
    user: User
    setUser: Function
    setTasks: Function
    setProjects: Function
    projects: [] | null
    tasks: [] | null
    isLoading: boolean
    setIsLoading: Function
    collaborators: [
        colab: {
            value: string | null
            id: string | null
            key: string | null
            name: string | null
        }

    ] | null
    setCollaborators: Function
    filterBy: string
    setFilterBy: Function
    filter: string
    setFilter: Function
    dayMinutes: String | null
    setDayMinutes: Function
    monthMinutes: String | null
    setMonthMinutes: Function
    SuccessToast: Function
    ErrorToast: Function

}

const Context = createContext<ContextData>(null!);


export const Provider = ({ children }: { children: JSX.Element }) => {
    const [user, setUser] = useState({ username: 'luciano', password: 'minhaSenha' });
    const [token, setToken] = useState(null);
    const [projects, setProjects] = useState(null)
    const [tasks, setTasks] = useState(null)
    const [collaborators, setCollaborators] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [filter, setFilter] = useState('')
    const [filterBy, setFilterBy] = useState('task')
    const [dayMinutes, setDayMinutes] = useState(null)
    const [monthMinutes, setMonthMinutes] = useState(null)
    const SuccessToast = (message: string) => {
        toast.success(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }

    const ErrorToast = (message: string) => {
        toast.error(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }



    return (
        <Context.Provider
            value={{ setUser, user, token, setToken, projects, setProjects, tasks, setTasks, isLoading, setIsLoading, collaborators, setCollaborators, filter, setFilter, filterBy, setFilterBy, dayMinutes, setDayMinutes, monthMinutes, setMonthMinutes, SuccessToast, ErrorToast }}
        >
            {children}
        </Context.Provider>
    );
};

export const useMyContext = () => useContext(Context);


