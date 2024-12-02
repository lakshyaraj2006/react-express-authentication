import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedRoutes = () => {
    const { auth } = useAuth();

    return (
        auth?.accessToken ? <Outlet /> : <Navigate to="/auth/login" />
    )
}

export default ProtectedRoutes;