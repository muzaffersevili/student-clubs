import http from "../http-common";
import ILogData from "../types/sclub.type"

class LogService {
  getAll() {
    return http.get<Array<ILogData>>("/logs");
  }

  get(id: string) {
    return http.get<ILogData>(`/logs/${id}`);
  }

  create(data: ILogData) {
    return http.post<ILogData>("/logs", data);
  }

  delete(id: any) {
    return http.delete<any>(`/logs/${id}`);
  }

  deleteAll() {
    return http.delete<any>(`/logs`);
  }

  findByName(name: string) {
    return http.get<Array<ILogData>>(`/logs?name=${name}`);
  }
}

export default new LogService();
