import http from "../http-common";
import IUser from "../types/user.type"
import ILogData from "../types/log.type"

import logService from "./log.service";

class UserDataService {
  async getRoles(id: string) {
    try {
      const response = await http.get<Array<string>>(`/users/user_roles/${id}`);

      const logData: ILogData = {
        messageType: 'GET ROLES SUCCESS',
        message: `get roles successful for user id: ${id} timestamp: ${new Date().toISOString()}`,
      };
      console.log(logData);
      logService.create(logData);
      return response.data;
    } catch (error) {
      const logData: ILogData = {
        messageType: 'GET ROLES FAILED',
        message: `get roles failed for user id: ${id} timestamp: ${new Date().toISOString()}`,
      };
      console.error(logData);
      logService.create(logData);
      throw error;
    }
  }


  async updateRoles(id: string, roles: Array<string>) {
    try {
      const response = await http.put<any>(`/users/user_roles/${id}`, roles);

      const logData: ILogData = {
        messageType: 'UPDATE ROLES SUCCESS',
        message: `update roles successful for user id: ${id} roles: ${JSON.stringify(roles)} timestamp: ${new Date().toISOString()}`,
      };
      console.log(logData);
      logService.create(logData);
      return response;
    } catch (error) {
      const logData: ILogData = {
        messageType: 'UPDATE ROLES FAILED',
        message: `update roles failed for user id: ${id} roles: ${JSON.stringify(roles)} timestamp: ${new Date().toISOString()}`,
      };
      console.error(logData);
      logService.create(logData);
      throw error;
    }
  }

  async getAll() {
    try {
      const response = await http.get<Array<IUser>>("/users");
      const logData: ILogData = {
        messageType: 'GET ALL SUCCESS',
        message: `get all users successful timestamp: ${new Date().toISOString()}`,
      };
      console.log(logData);
      logService.create(logData);
      return response;
    } catch (error) {
      const logData: ILogData = {
        messageType: 'GET ALL FAILED',
        message: `get all users failed timestamp: ${new Date().toISOString()}`
      };
      console.error(logData);
      logService.create(logData);
      throw error;
    }
  }
  
  async get(id: string) {
    try {
      const response = await http.get<IUser>(`/users/${id}`);
      const logData: ILogData = {
        messageType: 'GET SUCCESS',
        message: `get user successful for id: ${id} timestamp: ${new Date().toISOString()}`,
      };
      console.log(logData);
      logService.create(logData);
      return response;
    } catch (error) {
      const logData: ILogData = {
        messageType: 'GET FAILED',
        message: `get user failed for id: ${id} timestamp: ${new Date().toISOString()}`,
      };
      console.error(logData);
      logService.create(logData);
      throw error;
    }
  }
  
  async create(data: IUser) {
    try {
      const response = await http.post<IUser>("/users", data);
      const logData: ILogData = {
        messageType: 'CREATE SUCCESS',
        message: `create user successful for data: ${JSON.stringify(data)} timestamp: ${new Date().toISOString()}`,
      };
      console.log(logData);
      logService.create(logData);
      return response;
    } catch (error) {
      const logData: ILogData = {
        messageType: 'CREATE FAILED',
        message: `create user failed for data: ${JSON.stringify(data)} timestamp: ${new Date().toISOString()}`,
      };
      console.error(logData);
      logService.create(logData);
      throw error;
    }
  }
  
  

  async update(data: IUser, id: any) {
    try {
      const response = await http.put<any>(`/users/${id}`, data);
      const logData: ILogData = {
        messageType: 'UPDATE SUCCESS',
        message: `update user successful for id: ${id} data: ${JSON.stringify(data)} timestamp: ${new Date().toISOString()}`,
      };
      console.log(logData);
      logService.create(logData);
      return response;
    } catch (error) {
      const logData: ILogData = {
        messageType: 'UPDATE FAILED',
        message: `update user failed for id: ${id} data: ${JSON.stringify(data)} timestamp: ${new Date().toISOString()}`,
      };
      console.error(logData);
      logService.create(logData);
      throw error;
    }
  }
  
  
  async delete(id: any) {
    try {
      const response = await http.delete<any>(`/users/${id}`);
      const logData: ILogData = {
        messageType: 'DELETE SUCCESS',
        message: `delete user successful for id: ${id} timestamp: ${new Date().toISOString()}`,
      };
      console.log(logData);
      logService.create(logData);
      return response;
    } catch (error) {
      const logData: ILogData = {
        messageType: 'DELETE FAILED',
        message: `delete user failed for id: ${id} timestamp: ${new Date().toISOString()}`
      };
      console.error(logData);
      logService.create(logData);
      throw error;
    }
  }
  
  
  async deleteAll() {
    try {
      const response = await http.delete<any>(`/users`);
      const logData: ILogData = {
        messageType: 'DELETE ALL SUCCESS',
        message: `delete all users successful timestamp: ${new Date().toISOString()}`,
      };
      console.log(logData);
      logService.create(logData);
      return response;
    } catch (error) {
      const logData: ILogData = {
        messageType: 'DELETE ALL FAILED',
        message: `delete all users failed timestamp: ${new Date().toISOString()}`
      };
      console.error(logData);
      logService.create(logData);
      throw error;
    }
  }
  
  

  async findByName(name: string) {
    try {
      const response = await http.get<Array<IUser>>(`/users?name=${name}`);
      const logData: ILogData = {
        messageType: 'FIND BY NAME SUCCESS',
        message: `find user by name successful for name: ${name} timestamp: ${new Date().toISOString()}`,
      };
      console.log(logData);
      logService.create(logData);
      return response.data;
    } catch (error) {
      const logData: ILogData = {
        messageType: 'FIND BY NAME FAILED',
        message: `find user by name failed for name: ${name} timestamp: ${new Date().toISOString()}`
      };
      console.error(logData);
      logService.create(logData);
      throw error;
    }
  }
}

export default new UserDataService();