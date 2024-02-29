import { useState } from 'react';
import './JoinPage.css';
import AuthenticationService from '../../services/AuthenticationService';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const JoinPage = () => {
  const navigate = useNavigate();

  let authenticationService: AuthenticationService =
    new AuthenticationService();

  // user interface states
  const [loginPage, setLoginPage] = useState<boolean>(true);
  const [shiftForm, setShiftForm] = useState<boolean>(true);

  // login/register forms
  const [loginForm, setLoginForm] = useState<Object>({
    username: '',
    password: '',
  });
  const [registerForm, setRegisterForm] = useState<Object>({
    fullName: '',
    email: '',
    username: '',
    password: '',
  });

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

  const login = async () => {
    const { status, message }: any = await authenticationService.login(
      loginForm
    );
    console.log(status, message);
    if (status) {
      handleSuccess(message);
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } else {
      handleError(message);
    }
  };

  const handleSuccess = (message: any) => {
    toast.success(message, {
      position: 'bottom-center',
    });
  };

  const handleError = (message: any) => {
    toast.error(message, {
      position: 'bottom-center',
    });
  };

  const register = async () => {
    const response: any = await authenticationService.register(registerForm);
    const { message, status } = response;
    if (status) {
      handleSuccess(message);
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } else {
      handleError(message);
    }
  };

  return (
    <div
      style={{ backgroundColor: loginPage ? 'skyblue' : 'orange' }}
      className='join-container m-0 row justify-content-center align-items-center'
    >
      <div className='form-wrapper row w-75 justify-content-center align-items-center px-5'>
        {/* -----------------------------LOGIN FORM -------------------------- */}
        {shiftForm ? (
          <div className='col-md-6 px-5'>
            <h2 className='text-center'>Login</h2>
            <form onSubmit={(e) => e.preventDefault()}>
              <input
                id='user-name'
                className='bg-transparent form-control w-100 join-input my-3'
                placeholder='Username'
                type='text'
                onChange={(e) =>
                  setLoginForm({ ...loginForm, username: e.target.value })
                }
                onBlur={(e) =>
                  (e.target.style.borderColor = 'rgba(0, 0, 0, 0.4)')
                }
                onFocus={(e) => (e.target.style.borderColor = 'skyblue')}
              />
              <input
                id='password'
                className='bg-transparent form-control w-100 join-input my-3'
                placeholder='Password'
                type='password'
                onChange={(e) =>
                  setLoginForm({ ...loginForm, password: e.target.value })
                }
                onFocus={(e) => (e.target.style.borderColor = 'skyblue')}
                onBlur={(e) =>
                  (e.target.style.borderColor = 'rgba(0, 0, 0, 0.4)')
                }
              />
              <button
                className='rounded-pill px-4 py-2 login-btn-dark'
                type='submit'
                style={{
                  backgroundColor: loginPage ? 'skyblue' : 'transparent',
                }}
                onClick={login}
              >
                Login
              </button>
            </form>
          </div>
        ) : (
          <div className='col-md-6 text-center px-5'>
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
        {/* -----------------------------REGISTER FORM -------------------------- */}
        {shiftForm ? (
          <div className='col-md-6 text-center px-5'>
            <h4 className='text-white'>Don't have an account?</h4>
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
              id='full-name'
              className='bg-transparent form-control w-100 join-input my-3'
              placeholder='Full Name'
              type='text'
              onChange={(e) =>
                setRegisterForm({ ...registerForm, fullName: e.target.value })
              }
              onBlur={(e) =>
                (e.target.style.borderColor = 'rgba(0, 0, 0, 0.4)')
              }
              onFocus={(e) => (e.target.style.borderColor = 'orange')}
            />
            <input
              id='email'
              className='bg-transparent form-control w-100 join-input my-3'
              placeholder='Email'
              type='email'
              onChange={(e) =>
                setRegisterForm({ ...registerForm, email: e.target.value })
              }
              onBlur={(e) =>
                (e.target.style.borderColor = 'rgba(0, 0, 0, 0.4)')
              }
              onFocus={(e) => (e.target.style.borderColor = 'orange')}
            />
            <input
              id='username'
              className='bg-transparent form-control w-100 join-input my-3'
              placeholder='Username'
              type='text'
              onChange={(e) =>
                setRegisterForm({ ...registerForm, username: e.target.value })
              }
              onBlur={(e) =>
                (e.target.style.borderColor = 'rgba(0, 0, 0, 0.4)')
              }
              onFocus={(e) => (e.target.style.borderColor = 'orange')}
            />
            <input
              id='password'
              className='bg-transparent form-control w-100 join-input my-3'
              placeholder='Password'
              type='password'
              onChange={(e) =>
                setRegisterForm({ ...registerForm, password: e.target.value })
              }
              onBlur={(e) =>
                (e.target.style.borderColor = 'rgba(0, 0, 0, 0.4)')
              }
              onFocus={(e) => (e.target.style.borderColor = 'orange')}
            />

            <button
              className='rounded-pill px-4 py-2 login-btn-dark'
              style={{ backgroundColor: loginPage ? 'transparent' : 'orange' }}
              onClick={register}
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
      <Toaster />
    </div>
  );
};

export default JoinPage;
