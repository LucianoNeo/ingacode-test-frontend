import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/Api";




type AuthContextType = {
    user: string | null;
    signIn: Function
    signOut: () => void;
    setError: Function
    authenticated: boolean
    error: string | null
    token: string | null
    activeButton: boolean
    setActiveButton: Function

}

export const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null)
    const [token, setToken] = useState<string | null>(null)
    const [refresh_token, setRefreshToken] = useState<string | null>(null)
    const [activeButton, setActiveButton] = useState(true)

    useEffect(() => {
        const loadingStoreData = () => {
            const storageUser = localStorage.getItem("@Auth:user");
            const storageToken = localStorage.getItem("@Auth:token");

            if (storageUser && storageToken) {
                setUser(storageUser);
                setToken(storageToken);

            }
        };
        loadingStoreData();

    }, []);

    const signIn = async (username: string, password: string) => {
        try {
            setActiveButton(false)
            const response = await api.post("/login", { username, password });
            if (response.data.error) {
                console.log(response.data.error);
            } else {
                setUser(response.data.username);
                setToken(response.data.token);
                localStorage.setItem("@Auth:user", response.data.username);
                localStorage.setItem("@Auth:token", response.data.token);
            }
        } catch (error: any) {
            setError(error.response.data.error)
            setActiveButton(true)
        }
    };

    const signOut = () => {
        localStorage.clear();
        setUser(null);
        setError(null)
        setActiveButton(true)
    };


    return (
        <AuthContext.Provider
            value={{
                user,
                signIn,
                signOut,
                authenticated: !!user,
                error,
                setError,
                token,
                activeButton,
                setActiveButton,

            }}
        >
            {children}
        </AuthContext.Provider>
    );
};