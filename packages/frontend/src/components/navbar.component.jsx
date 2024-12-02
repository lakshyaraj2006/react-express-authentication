import React from 'react'
import { Link } from 'react-router-dom'
import useAuth from "../hooks/useAuth"
import useLogout from '../hooks/useLogout';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const { auth } = useAuth();
    const logout = useLogout();
    const navigate = useNavigate();

    const signOut = async () => {
        await logout();
        navigate('/auth/login');
    }

    return (
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">iSecure</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="#">About Us</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="#">Contact Us</Link>
                        </li>
                    </ul>
                    {!auth?.accessToken && <div>
                        <Link className='btn btn-danger me-2' to="/auth/login">Login</Link>
                        <Link className='btn btn-danger' to="/auth/register">Register</Link>
                    </div>}
                    {auth?.accessToken && <div>
                        <button className="btn btn-danger" onClick={signOut}>Logout</button>
                    </div>}
                </div>
            </div>
        </nav>
    )
}

export default Navbar