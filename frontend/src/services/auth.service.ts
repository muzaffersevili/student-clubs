import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
    login(email: string, password: string) {
      return axios
        .post(API_URL + "signin", {
          email,
          password
        })
        .then(response => {
          if (response.data.accessToken) {
            localStorage.setItem("user", JSON.stringify(response.data));
          }
  
          return response.data;
        });
    }
  
    logout() {
      localStorage.removeItem("user");
    }
  
    register(email: string, password: string) {
      return axios.post(API_URL + "signup", {
        email,
        password
      });
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