import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './Loginform.css';

const API_URL = 'http://localhost:3001/login';

function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const inputHandler = (event) => {
    const { name, value } = event.target;
    setData((previousState) => ({
      ...previousState,
      [name]: value,
    }));
  };

  const formSubmitter = (e) => {
    e.preventDefault();

    axios
      .post(API_URL, data)
      .then((response) => {
        console.log(response.data.data.id)
        if (response.status === 200) {
          let userid = response.data.data.id;
          let usertype = response.data.data.usertype;
          let username = response.data.data.username;
          sessionStorage.setItem('userid', userid);
          sessionStorage.setItem('usertype', usertype);
          sessionStorage.setItem('username', username);
          setErrorMessage('');

          if (usertype === 'admin') {
            navigate('/user');
          } else if (usertype === 'Training Head') {
            navigate('/trainer');
          } else {
            navigate('/placement');
          }
        } else {
          setErrorMessage('Invalid email or password');
        }
      })
      .catch((error) => {
        setErrorMessage('An error occurred while making the request. Please try again later.');
        console.log(error);
      });
  };

  return (
    <div className='wrapper bg-secondary d-flex align-items-center justify-content-center w-100'>
      <div className='Login'>
        <h2 className='mb-3'> Login</h2>
        {errorMessage.length > 0 && <div style={{ marginBottom: '10px', color: 'red' }}>{errorMessage}</div>}

        <form className='needs-validation' onSubmit={formSubmitter}>
          <div className='Foram-group was-validated mb-2'>
            <label htmlFor='email' className='form-label'>
              Email
            </label>
            <input
              type='text'
              className='form-control'
              required
              onChange={inputHandler}
              value={data.email}
              name='email'
            />
            <div className='invalid-feedback'>Please enter your email.</div>
          </div>

          <div className='Foram-group was-validated mb-2'>
            <label htmlFor='password' className='form-label'>
              Password
            </label>
            <input
              type='password'
              className='form-control'
              required
              onChange={inputHandler}
              value={data.password}
              name='password'
            />
            <div className='invalid-feedback'>Please enter your password.</div>
          </div>

          <div className='d-grid gap-2 mt-3'>
            <button type='submit' className='btn btn-primary'>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;