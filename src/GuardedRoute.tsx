import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Outlet, useNavigate } from 'react-router-dom';
import AuthenticationService from './services/AuthenticationService';

export const ProtectedRoute = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies<any>([]);
  const authenticationService = new AuthenticationService();

  useEffect(() => {
    if (!cookies.token) {
      navigate('/auth');
    } else {
      const userVerification = async () => {
        const { status, message, user }: any =
          await authenticationService.userVerification();
        if (status) {
          localStorage.setItem('user', user);
        } else {
          navigate('/auth');
        }
        userVerification();
      };
    }
  }, []);
  return (
    <div>
      <Outlet />
    </div>
  );
};
