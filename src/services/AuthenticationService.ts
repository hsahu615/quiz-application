import axios from 'axios'

export default class AuthenticationService {
  private BASE_URL = process.env.SERVER_URL;
  login = async (user: any) => {
    try {
      const response = await axios.post("http://localhost:3000/auth/login", { user: user });
      return response;
    } catch (e: any) {
      console.error(e.message);
      return 401;
    }
  }

  register = async (user: any) => {
    try {
      const response = await axios.post("http://localhost:3000/auth/register", { user: user });
      return response;
    } catch (e: any) {
      console.error(e.message);
      return 401;
    }
  }
}