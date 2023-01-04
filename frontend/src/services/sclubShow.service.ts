import http from "../http-common";
import ISclubData from "../types/sclub.type"

class SclubDataService {
  getAll() {
    return http.get<Array<ISclubData>>("/sclubss");
  }

  get(id: string) {
    return http.get<ISclubData>(`/sclubss/${id}`);
  }

  findByTitle(title: string) {
    return http.get<Array<ISclubData>>(`/sclubss?title=${title}`);
  }
}

export default new SclubDataService();

