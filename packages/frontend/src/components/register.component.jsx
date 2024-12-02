import React from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import axios from '../api/axios';

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({ mode: 'onChange' });
  const navigate = useNavigate();

  const password = watch('password');

  const onSubmit = async (data) => {
    const response = await axios.post('/auth/register', JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    });

    const { success, message } = response.data;

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

      setTimeout(() => {
        navigate('/auth/login');
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
      <h1>Register For New Account</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input type="text" className="form-control" id="username" name="username" placeholder="Enter your username"
            {...register('username', {
              required: { value: true, message: 'Username is required!' },
              minLength: {value: 6, message: 'Username is too short'},
              maxLength: {value: 12, message: 'Username is too long'},
            })} />
          {errors?.username?.message && <p className='text-danger'>{errors?.username?.message}</p>}
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email Address</label>
          <input type="email" className="form-control" id="email" name="email" placeholder="Enter your email address"
            {...register('email', {
              required: { value: true, message: 'Email is required!' },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address!"
              }
            })} />
          {errors?.email?.message && <p className='text-danger'>{errors?.email?.message}</p>}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" placeholder="Enter your password"
            {...register('password', {
              required: { value: true, message: 'Password is required!' },
              minLength: {value: 8, message: 'Password is too short'},
            })} />
          {errors?.password?.message && <p className='text-danger'>{errors?.password?.message}</p>}
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name="cpassword" placeholder="Confirm your password"
            {...register('cpassword', {
              required: { value: true, message: 'Confirm Password is required!' },
              validate: (value) => password === value || 'Passwords do not match!'
            })} />
          {errors?.cpassword?.message && <p className='text-danger'>{errors?.cpassword?.message}</p>}
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
  )
}

export default Register