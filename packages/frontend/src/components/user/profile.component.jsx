import React from 'react'
import useLogout from '../../hooks/useLogout'

const UserProfile = () => {
  const logout = useLogout();

  const signOut = async () => {
    await logout();
  }

  return (
    <div className="container my-3">
      <h1>Welcome to your dashboard!</h1>

      <button className="btn btn-danger" onClick={signOut}>Logout</button>
    </div>
  )
}

export default UserProfile