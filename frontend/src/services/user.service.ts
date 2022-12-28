import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/test/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getStudentBoard() {
    return axios.get(API_URL + 'student', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }

  getChairPersonBoard() {
    return axios.get(API_URL + 'chairperson', { headers: authHeader() });
  }

  getCounselorBoard() {
    return axios.get(API_URL + 'counselor', { headers: authHeader() });
  }
}

export default new UserService(); //service for accessing data