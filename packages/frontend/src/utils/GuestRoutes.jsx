import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const GuestRoutes = () => {
    const { auth } = useAuth();
    
    return (
        !auth?.accessToken ? <Outlet /> : <Navigate to="/user/profile" />
    )
}

export default GuestRoutes;