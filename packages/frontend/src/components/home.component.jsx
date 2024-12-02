import React from 'react'
import useAuth from '../hooks/useAuth'
import { Link } from 'react-router-dom';

const Home = () => {
  const { auth } = useAuth();
  return (
    <div className="jumbotron text-center">
      <div className="container">
        <h1>Welcome to iSecure!</h1>
        {!auth?.accessToken && <>
          <Link className='btn btn-danger me-2' to="/auth/login">Login</Link>
          <Link className='btn btn-danger' to="/auth/register">Register</Link>
        </>}
        {auth?.accessToken && <Link className='btn btn-danger me-2' to="/user/profile">My Profile</Link>}
      </div>
    </div>
  )
}

export default Home