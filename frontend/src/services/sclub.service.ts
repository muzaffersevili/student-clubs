import http from "../http-common";
import ISclubData from "../types/sclub.type"

class SclubDataService {
  getAll() {
    return http.get<Array<ISclubData>>("/sclubs");
  }

  get(id: string) {
    return http.get<ISclubData>(`/sclubs/${id}`);
  }

  create(data: ISclubData) {
    return http.post<ISclubData>("/sclubs", data);
  }

  update(data: ISclubData, id: any) {
    return http.put<any>(`/sclubs/${id}`, data);
  }

  delete(id: any) {
    return http.delete<any>(`/sclubs/${id}`);
  }

  deleteAll() {
    return http.delete<any>(`/sclubs`);
  }

  findByTitle(title: string) {
    return http.get<Array<ISclubData>>(`/sclubs?title=${title}`);
  }
}

export default new SclubDataService();

