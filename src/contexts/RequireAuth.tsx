import { ReactElement, ReactNode, useContext } from "react";
import { RouteProps } from "react-router-dom";
import Login, { } from "../pages/Login";
import { AuthContext } from "./AuthContext";

type Props = RouteProps & { children: ReactElement };

export const RequireAuth = ({ children }: Props) => {
    const { authenticated } = useContext(AuthContext)

    if (!authenticated) {
        return <Login />
    }

    return children;
}