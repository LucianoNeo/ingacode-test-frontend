import { useContext } from "react";
import Login, { } from "../pages/Login";
import { AuthContext } from "./AuthContext";

export const RequireAuth = ({ children }) => {
    const { authenticated } = useContext(AuthContext)

    if (!authenticated) {
        return <Login />
    }

    return children;
}