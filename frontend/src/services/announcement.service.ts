import http from "../http-common";
import IAnnouncementData from "../types/announcement.type"
import logService from "./log.service";
import ILogData from "../types/log.type";

class AnnouncementDataService {
  async getAll() {
    try {
      const response = await http.get<Array<IAnnouncementData>>("/announcements");
      const logData: ILogData = {
        messageType: 'GET ALL SUCCESS',
        message: `get all announcements successful timestamp: ${new Date().toISOString()}`,
      };
      console.log(logData);
      logService.create(logData);
      return response;
    } catch (error) {
      const logData: ILogData = {
        messageType: 'GET ALL FAILED',
        message: `get all announcements failed timestamp: ${new Date().toISOString()}`,
      };
      console.error(logData);
      logService.create(logData);
      throw error;
    }
  }
  
  async get(id: string) {
    try {
      const response = await http.get<IAnnouncementData>(`/announcements/${id}`);
      const logData: ILogData = {
        messageType: 'GET SUCCESS',
        message: `get announcement successful for id: ${id} timestamp: ${new Date().toISOString()}`,
      };
      console.log(logData);
      logService.create(logData);
      return response;
    } catch (error) {
      const logData: ILogData = {
        messageType: 'GET FAILED',
        message: `get announcement failed for id: ${id} timestamp: ${new Date().toISOString()}`,
      };
      console.error(logData);
      logService.create(logData);
      throw error;
    }
  }
  

  async create(data: IAnnouncementData) {
    try {
      const response = await http.post<IAnnouncementData>("/announcements", data);
      const logData: ILogData = {
        messageType: 'CREATE SUCCESS',
        message: `create announcement successful for data: ${JSON.stringify(data)} timestamp: ${new Date().toISOString()}`,
      };
      console.log(logData);
      logService.create(logData);
      return response;
    } catch (error) {
      const logData: ILogData = {
        messageType: 'CREATE FAILED',
        message: `create announcement failed for data: ${JSON.stringify(data)} timestamp: ${new Date().toISOString()}`,
      };
      console.error(logData);
      logService.create(logData);
      throw error;
    }
  }
  

  async update(data: IAnnouncementData, id: any) {
    try {
      const response = await http.put<any>(`/announcements/${id}`, data);
      const logData: ILogData = {
        messageType: 'UPDATE SUCCESS',
        message: `update announcement successful for id: ${id} data: ${JSON.stringify(data)} timestamp: ${new Date().toISOString()}`,
      };
      console.log(logData);
      logService.create(logData);
      return response;
    } catch (error) {
      const logData: ILogData = {
        messageType: 'UPDATE FAILED',
        message: `update announcement failed for id: ${id} data: ${JSON.stringify(data)} timestamp: ${new Date().toISOString()}`,
      };
      console.error(logData);
      logService.create(logData);
      throw error;
    }
  }

  async delete(id: any) {
    try {
      const response = await http.delete<any>(`/announcements/${id}`);
      const logData: ILogData = {
        messageType: 'DELETE SUCCESS',
        message: `delete announcement successful for id: ${id} timestamp: ${new Date().toISOString()}`,
      };
      console.log(logData);
      logService.create(logData);
      return response;
    } catch (error) {
      const logData: ILogData = {
        messageType: 'DELETE FAILED',
        message: `delete announcement failed for id: ${id} timestamp: ${new Date().toISOString()}`,
      };
      console.error(logData);
      logService.create(logData);
      throw error;
    }
  }

  async deleteAll() {
    try {
      const response = await http.delete<any>(`/announcements`);
      const logData: ILogData = {
        messageType: 'DELETE ALL SUCCESS',
        message: `delete all announcements successful timestamp: ${new Date().toISOString()}`,
      };
      console.log(logData);
      logService.create(logData);
      return response;
    } catch (error) {
      const logData: ILogData = {
        messageType: 'DELETE ALL FAILED',
        message: `delete all announcements failed timestamp: ${new Date().toISOString()}`,
      };
      console.error(logData);
      logService.create(logData);
      throw error;
    }
  }
  

  async findByTitle(title: string) {
    try {
      const response = await http.get<Array<IAnnouncementData>>(`/announcements?title=${title}`);
      const logData: ILogData = {
        messageType: 'FIND BY TITLE SUCCESS',
        message: `find announcements by title successful for title: ${title} timestamp: ${new Date().toISOString()}`,
      };
      console.log(logData);
      logService.create(logData);
      return response;
    } catch (error) {
      const logData: ILogData = {
        messageType: 'FIND BY TITLE FAILED',
        message: `find announcements by title failed for title: ${title} timestamp: ${new Date().toISOString()}`,
      };
      console.error(logData);
      logService.create(logData);
      throw error;
    }
  }
}

export default new AnnouncementDataService();

