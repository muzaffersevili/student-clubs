import http from "../http-common";
import IEventData from "../types/event.type"
import ILogData from "../types/log.type"

import logService from "./log.service"

class EventsDataService {
    async getAll() {
    try {
      const response = await http.get<Array<IEventData>>("/events");
      const logData: ILogData = {
        messageType: 'GET ALL SUCCESS',
        message: `get all events successful timestamp: ${new Date().toISOString()}`,
      };
      console.log(logData);
      logService.create(logData);
      return response;
    } catch (error) {
      const logData: ILogData = {
        messageType: 'GET ALL FAILED',
        message: `get all events failed timestamp: ${new Date().toISOString()}`,
      };
      console.error(logData);
      logService.create(logData);
      throw error;
    }
  }
  
  async get(id: string) {
    try {
      const response = await http.get<IEventData>(`/events/${id}`);
      const logData: ILogData = {
        messageType: 'GET SUCCESS',
        message: `get event successful for id: ${id} timestamp: ${new Date().toISOString()}`,
      };
      console.log(logData);
      logService.create(logData);
      return response;
    } catch (error) {
      const logData: ILogData = {
        messageType: 'GET FAILED',
        message: `get event failed for id: ${id} timestamp: ${new Date().toISOString()}`,
      };
      console.error(logData);
      logService.create(logData);
      throw error;
    }
  }
  

  async create(data: IEventData) {
    try {
      const response = await http.post<IEventData>("/events", data);
      const logData: ILogData = {
        messageType: 'CREATE SUCCESS',
        message: `create event successful for data: ${JSON.stringify(data)} timestamp: ${new Date().toISOString()}`,
      };
      console.log(logData);
      logService.create(logData);
      return response;
    } catch (error) {
      const logData: ILogData = {
        messageType: 'CREATE FAILED',
        message: `create event failed for data: ${JSON.stringify(data)} timestamp: ${new Date().toISOString()}`,
      };
      console.error(logData);
      logService.create(logData);
      throw error;
    }
  }
  

  async update(data: IEventData, id: any) {
    try {
      const response = await http.put<any>(`/events/${id}`, data);
      const logData: ILogData = {
        messageType: 'UPDATE SUCCESS',
        message: `update event successful for id: ${id} data: ${JSON.stringify(data)} timestamp: ${new Date().toISOString()}`,
      };
      console.log(logData);
      logService.create(logData);
      return response;
    } catch (error) {
      const logData: ILogData = {
        messageType: 'UPDATE FAILED',
        message: `update event failed for id: ${id} data: ${JSON.stringify(data)} timestamp: ${new Date().toISOString()}`,
      };
      console.error(logData);
      logService.create(logData);
      throw error;
    }
  }

  async delete(id: any) {
    try {
      const response = await http.delete<any>(`/events/${id}`);
      const logData: ILogData = {
        messageType: 'DELETE SUCCESS',
        message: `delete event successful for id: ${id} timestamp: ${new Date().toISOString()}`,
      };
      console.log(logData);
      logService.create(logData);
      return response;
    } catch (error) {
      const logData: ILogData = {
        messageType: 'DELETE FAILED',
        message: `delete event failed for id: ${id} timestamp: ${new Date().toISOString()}`,
      };
      console.error(logData);
      logService.create(logData);
      throw error;
    }
  }

  async deleteAll() {
    try {
      const response = await http.delete<any>(`/events`);
      const logData: ILogData = {
        messageType: 'DELETE ALL SUCCESS',
        message: `delete all events successful timestamp: ${new Date().toISOString()}`,
      };
      console.log(logData);
      logService.create(logData);
      return response;
    } catch (error) {
      const logData: ILogData = {
        messageType: 'DELETE ALL FAILED',
        message: `delete all events failed timestamp: ${new Date().toISOString()}`,
      };
      console.error(logData);
      logService.create(logData);
      throw error;
    }
  }
  

  async findByTitle(title: string) {
    try {
      const response = await http.get<Array<IEventData>>(`/events?title=${title}`);
      const logData: ILogData = {
        messageType: 'FIND BY TITLE SUCCESS',
        message: `find events by title successful for title: ${title} timestamp: ${new Date().toISOString()}`,
      };
      console.log(logData);
      logService.create(logData);
      return response;
    } catch (error) {
      const logData: ILogData = {
        messageType: 'FIND BY TITLE FAILED',
        message: `find events by title failed for title: ${title} timestamp: ${new Date().toISOString()}`,
      };
      console.error(logData);
      logService.create(logData);
      throw error;
    }
  }
}

export default new EventsDataService();