import axios from 'axios'
import { removeCookie } from '../util';
import { useNavigate } from 'react-router-dom';

export default class AuthenticationService {
  navigate = useNavigate();
  private BASE_URL = process.env.SERVER_URL;
  login = async (user: any) => {
    try {
      const { data } = await axios.post("http://localhost:3000/auth/login", { user: user }, { withCredentials: true });
      const { message, status } = data;
      localStorage.setItem('user', JSON.stringify(data.user));
      return { message, status };
    } catch (e: any) {
      console.error(e.message);
      return 401;
    }
  }

  register = async (user: any) => {
    try {
      const { data } = await axios.post("http://localhost:3000/auth/register", { user: user }, { withCredentials: true });
      localStorage.setItem('user', JSON.stringify(data.user));
      const { message, status } = data;
      return { status, message };
    } catch (e: any) {
      console.log(e.message);
      return;
    }
  }

  userVerification = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/auth/user-verification", {
        withCredentials: true
      });
      const { status, message, user } = data;
      return { status, message, user };
    } catch (e) {
      console.log(e);
    }
  }

  logOut = () => {
    removeCookie('token');
    this.navigate('/auth')
  }

}