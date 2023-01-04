import axios from "axios";
import logService from "./log.service";
import ILogData from "../types/log.type";

const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
  async login(email: string, password: string) {
    try {
      const response = await axios.post(API_URL + "signin", {
        email,
        password
      });

      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));

        const logData: ILogData = {
          messageType: 'LOGIN SUCCESS',
          message: `login by email: ${email} timestamp: ${new Date().toISOString()}`,
        };
        console.log(logData);
        logService.create(logData);
        return response;
      }
      if (response.status == 404) {

      }

      return response;
    } catch (error) {
      const logData: ILogData = {
        messageType: 'LOGIN FAILED',
        message: `login failed for email: ${email} timestamp: ${new Date().toISOString()}`,
      };
      console.error(logData);
      logService.create(logData);
      throw error;
    }
  }


  logout() {
    const user = JSON.parse((localStorage.getItem("user"))!);
    const logData: ILogData = {
      messageType: 'LOGOUT',
      message: `logout: email=${user.email} timestamp: ${new Date().toISOString()}`,
    };
    console.error(logData);
    logService.create(logData);

    localStorage.removeItem("user");
  }

  async register(email: string, password: string, roles: Array<string>) {
    try {
      const response = await axios.post(API_URL + "signup", {
        email,
        password,
        roles,
      });
  
      const logData: ILogData = {
        messageType: 'REGISTRATION SUCCESS',
        message: `registration successful for email: ${email} timestamp: ${new Date().toISOString()}`,
      };
      console.log(logData);
      logService.create(logData);
      return response;
    } catch (error) {
      const logData: ILogData = {
        messageType: 'REGISTRATION FAILED',
        message: `registration failed for email: ${email} timestamp: ${new Date().toISOString()}`
      };
      console.error(logData);
      logService.create(logData);
      throw error;
    }
  }
  

  getCurrentUser() {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);

    return null;
  }
}

export default new AuthService();
  /*
The service uses Axios for HTTP requests and Local Storage for user information & JWT.
It provides following important methods:

  login(): POST {username, password} & save JWT to Local Storage
  logout(): remove JWT from Local Storage
  register(): POST {username, email, password}
  getCurrentUser(): get stored user information (including JWT)

*/