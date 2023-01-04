import http from "../http-common";
import ISannouncementData from "../types/announcement.type"

class AnnouncementDataService {
  getAll() {
    return http.get<Array<ISannouncementData>>("/announcements");
  }

  get(id: string) {
    return http.get<ISannouncementData>(`/announcements/${id}`);
  }

  create(data: ISannouncementData) {
    return http.post<ISannouncementData>("/announcements", data);
  }

  update(data: ISannouncementData, id: any) {
    return http.put<any>(`/announcements/${id}`, data);
  }

  delete(id: any) {
    return http.delete<any>(`/announcements/${id}`);
  }

  deleteAll() {
    return http.delete<any>(`/announcements`);
  }

  findByTitle(title: string) {
    return http.get<Array<ISannouncementData>>(`/announcements?title=${title}`);
  }
}

export default new AnnouncementDataService();

