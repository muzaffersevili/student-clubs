import http from "../http-common";
import ISeventData from "../types/event.type"
import LogService from "./log.service"

class EventsDataService {
  getAll() {
    return http.get<Array<ISeventData>>("/events");
  }

  get(id: string) {
    return http.get<ISeventData>(`/events/${id}`);
  }

  create(data: ISeventData) {
    return http.post<ISeventData>("/events", data);
  }

  update(data: ISeventData, id: any) {
    return http.put<any>(`/events/${id}`, data);
  }

  delete(id: any) {
    return http.delete<any>(`/events/${id}`);
  }

  deleteAll() {
    return http.delete<any>(`/events`);
  }

  findByTitle(title: string) {
    return http.get<Array<ISeventData>>(`/events?title=${title}`);
  }
}

export default new EventsDataService();