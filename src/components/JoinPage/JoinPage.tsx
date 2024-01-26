import React, { useState } from 'react';
import './JoinPage.css';

const JoinPage = () => {
  const [loginPage, setLoginPage] = useState<boolean>(true);
  const [shiftForm, setShiftForm] = useState<boolean>(true);

  const formShifter = (event: any) => {
    if (event.target.innerHTML == 'Login') {
      setTimeout(() => {
        setShiftForm(true);
      }, 200);
    } else {
      setTimeout(() => {
        setShiftForm(false);
      }, 200);
    }
  };

  return (
    <div
      style={{ backgroundColor: loginPage ? 'skyblue' : 'orange' }}
      className='join-container m-0 row justify-content-center align-items-center'
    >
      <div className='form-wrapper row w-75 justify-content-center align-items-center px-5'>
        {shiftForm ? (
          <div className='col-md-6 px-5'>
            <h2 className='text-center'>Login</h2>
            <input
              className='bg-transparent form-control w-100 join-input my-3'
              placeholder='Username'
              type='text'
              onBlur={(e) =>
                (e.target.style.borderColor = 'rgba(0, 0, 0, 0.4)')
              }
              onFocus={(e) => (e.target.style.borderColor = 'skyblue')}
            />
            <input
              className='bg-transparent form-control w-100 join-input my-3'
              placeholder='Password'
              type='password'
              onFocus={(e) => (e.target.style.borderColor = 'skyblue')}
              onBlur={(e) =>
                (e.target.style.borderColor = 'rgba(0, 0, 0, 0.4)')
              }
            />
            <button
              className='rounded-pill px-4 py-2 login-btn-dark'
              style={{ backgroundColor: loginPage ? 'skyblue' : 'transparent' }}
            >
              Login
            </button>
          </div>
        ) : (
          <div className='col-md-6 px-5'>
            <h4 className='text-white'>Already an User?</h4>
            <button
              className='rounded-pill px-4 py-2 login-btn'
              onClick={(e) => {
                setLoginPage(true);
                formShifter(e);
              }}
            >
              Login
            </button>
          </div>
        )}

        {shiftForm ? (
          <div className='col-md-6 px-5'>
            <h4 className='text-white'>Don't have an accound?</h4>
            <button
              className='rounded-pill px-4 py-2 login-btn'
              onClick={(e) => {
                setLoginPage(false);
                formShifter(e);
              }}
            >
              Register
            </button>
          </div>
        ) : (
          <div className='col-md-6 px-5'>
            <h2 className='text-center'>Register</h2>
            <input
              className='bg-transparent form-control w-100 join-input my-3'
              placeholder='Full Name'
              type='text'
              onBlur={(e) =>
                (e.target.style.borderColor = 'rgba(0, 0, 0, 0.4)')
              }
              onFocus={(e) => (e.target.style.borderColor = 'orange')}
            />
            <input
              className='bg-transparent form-control w-100 join-input my-3'
              placeholder='Email'
              type='email'
              onBlur={(e) =>
                (e.target.style.borderColor = 'rgba(0, 0, 0, 0.4)')
              }
              onFocus={(e) => (e.target.style.borderColor = 'orange')}
            />
            <input
              className='bg-transparent form-control w-100 join-input my-3'
              placeholder='Username'
              type='text'
              onBlur={(e) =>
                (e.target.style.borderColor = 'rgba(0, 0, 0, 0.4)')
              }
              onFocus={(e) => (e.target.style.borderColor = 'orange')}
            />
            <input
              className='bg-transparent form-control w-100 join-input my-3'
              placeholder='Password'
              type='password'
              onBlur={(e) =>
                (e.target.style.borderColor = 'rgba(0, 0, 0, 0.4)')
              }
              onFocus={(e) => (e.target.style.borderColor = 'orange')}
            />

            <button
              className='rounded-pill px-4 py-2 login-btn-dark'
              style={{ backgroundColor: loginPage ? 'transparent' : 'orange' }}
            >
              Register
            </button>
          </div>
        )}

        <div
          className='moving-form-container col-md-6 bg-white'
          style={{
            transform: loginPage
              ? 'translateX(calc(0% + 3rem))'
              : 'translateX(calc(100% - 3rem))',
          }}
        ></div>
      </div>
    </div>
  );
};

export default JoinPage;
