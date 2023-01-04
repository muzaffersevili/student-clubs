import http from "../http-common";
import ISclubData from "../types/sclub.type"
import ILogData from "../types/log.type"

import logService from "./log.service";

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
        message: `get all sclubs failed timestamp: ${new Date().toISOString()}`,
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
        message: `get sclub failed for id: ${id} timestamp: ${new Date().toISOString()}`
      };
      console.error(logData);
      logService.create(logData);
      throw error;
    }
  }


  async findByTitle(title: string) {
    try {
      const response = await http.get<Array<ISclubData>>(`/sclubs?title=${title}`);

      const logData: ILogData = {
        messageType: 'FIND BY TITLE SUCCESS',
        message: `find sclubs by title successful for title: ${title} timestamp: ${new Date().toISOString()}`,
      };
      console.log(logData);
      logService.create(logData);
      return response.data;
    } catch (error) {
      const logData: ILogData = {
        messageType: 'FIND BY TITLE FAILED',
        message: `find sclubs by title failed for title: ${title} timestamp: ${new Date().toISOString()}`,
      };
      console.error(logData);
      logService.create(logData);
      throw error;
    }
  }
}

export default new SclubDataService();

