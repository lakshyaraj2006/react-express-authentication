import React from 'react'
import useAuth from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import axios from '../api/axios';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ mode: "onChange" });
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const response = await axios.post('/auth/login', JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    });

    const { success, message, accessToken } = response.data;

    if (success) {
      toast.success(message, {
        position: "top-right",
        autoClose: 3200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      setAuth({ accessToken });

      setTimeout(() => {
        navigate('/user/profile');
      }, 3200);
    } else {
      toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
      });
    }
  }

  return (
    <div className="container my-3">
      <h1>Login Using Credentials</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input type="text" className="form-control" id="username" name="username" placeholder="Enter your username"
            {...register('username', {
              required: { value: true, message: 'Username is required!' }
            })} />
          {errors?.username?.message && <p className='text-danger'>{errors?.username?.message}</p>}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" placeholder="Enter your password"
            {...register('password', {
              required: { value: true, message: 'Password is required!' }
            })} />
          {errors?.password?.message && <p className='text-danger'>{errors?.password?.message}</p>}
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  )
}

export default Login