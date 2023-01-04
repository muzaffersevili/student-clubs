import http from "../http-common";
import ISclubData from "../types/sclub.type"
import ILogData from "../types/log.type"

import logService from "./log.service"

class SclubDataService {
  async getAll() {
    try {
      const response = await http.get<Array<ISclubData>>("/sclubs");
      const logData: ILogData = {
        messageType: 'GET ALL SUCCESS',
        message: `get all sclubs successful timestamp: ${new Date().toISOString()}`,
      };
      console.log(logData);
      logService.create(logData);
      return response;
    } catch (error) {
      const logData: ILogData = {
        messageType: 'GET ALL FAILED',
        message: `get all sclubs failed timestamp: ${new Date().toISOString()}`
      };
      console.error(logData);
      logService.create(logData);
      throw error;
    }
  }
  

  async get(id: string) {
    try {
      const response = await http.get<ISclubData>(`/sclubs/${id}`);
      const logData: ILogData = {
        messageType: 'GET SUCCESS',
        message: `get sclub successful for id: ${id} timestamp: ${new Date().toISOString()}`,
      };
      console.log(logData);
      logService.create(logData);
      return response;
    } catch (error) {
      const logData: ILogData = {
        messageType: 'GET FAILED',
        message: `get sclub failed for id: ${id} timestamp: ${new Date().toISOString()}`,
      };
      console.error(logData);
      logService.create(logData);
      throw error;
    }
  }
  

  async create(data: ISclubData) {
    try {
      const response = await http.post<ISclubData>("/sclubs", data);
      console.log(response);
      const logData: ILogData = {
        messageType: 'CREATE SUCCESS',
        message: `create sclub successful for data: ${JSON.stringify(data)} timestamp: ${new Date().toISOString()}`,
      };
      console.log(logData);
      logService.create(logData);
      return response;
    } catch (error) {
      const logData: ILogData = {
        messageType: 'CREATE FAILED',
        message: `create sclub failed for data: ${JSON.stringify(data)} timestamp: ${new Date().toISOString()}`,
      };
      console.error(logData);
      logService.create(logData);
      throw error;
    }
  }

  async update(data: ISclubData, id: any) {
    try {
      const response = await http.put<any>(`/sclubs/${id}`, data);
      const logData: ILogData = {
        messageType: 'UPDATE SUCCESS',
        message: `update sclub successful for id: ${id} data: ${JSON.stringify(data)} timestamp: ${new Date().toISOString()}`,
      };
      console.log(logData);
      logService.create(logData);
      return response;
    } catch (error) {
      const logData: ILogData = {
        messageType: 'UPDATE FAILED',
        message: `update sclub failed for id: ${id} data: ${JSON.stringify(data)} timestamp: ${new Date().toISOString()}`,
      };
      console.error(logData);
      logService.create(logData);
      throw error;
    }
  }
  
  
  async delete(id: any) {
    try {
      const response = await http.delete<any>(`/sclubs/${id}`);
      const logData: ILogData = {
        messageType: 'DELETE SUCCESS',
        message: `delete sclub successful for id: ${id} timestamp: ${new Date().toISOString()}`,
      };
      console.log(logData);
      logService.create(logData);
      return response;
    } catch (error) {
      const logData: ILogData = {
        messageType: 'DELETE FAILED',
        message: `delete sclub failed for id: ${id} timestamp: ${new Date().toISOString()}`
      };
      console.error(logData);
      logService.create(logData);
      throw error;
    }
  }
  
  
  async deleteAll() {
    try {
      const response = await http.delete<any>(`/sclubs`);
      const logData: ILogData = {
        messageType: 'DELETE ALL SUCCESS',
        message: `delete all sclubs successful timestamp: ${new Date().toISOString()}`,
      };
      console.log(logData);
      logService.create(logData);
      return response;
    } catch (error) {
      const logData: ILogData = {
        messageType: 'DELETE ALL FAILED',
        message: `delete all sclubs failed timestamp: ${new Date().toISOString()}`
      };
      console.error(logData);
      logService.create(logData);
      throw error;
    }
  }
  
  

  async findByName(name: string) {
    try {
      const response = await http.get<Array<ISclubData>>(`/sclubs?name=${name}`);
      const logData: ILogData = {
        messageType: 'FIND BY NAME SUCCESS',
        message: `find sclubs by name successful for name: ${name} timestamp: ${new Date().toISOString()}`,
      };
      console.log(logData);
      logService.create(logData);
      return response.data;
    } catch (error) {
      const logData: ILogData = {
        messageType: 'FIND BY NAME FAILED',
        message: `find sclubs by name failed for name: ${name} timestamp: ${new Date().toISOString()}`
      };
      console.error(logData);
      logService.create(logData);
      throw error;
    }
  }
  
  
}

export default new SclubDataService();

