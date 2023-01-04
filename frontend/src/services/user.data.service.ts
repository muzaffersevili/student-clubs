import http from "../http-common";
import IUser from "../types/user.type"

class UserDataService {
  getRoles(id: string) {
    console.log(`/users/user_roles/${id}`);
    return http.get<Array<string>>(`/users/user_roles/${id}`);
  }

  updateRoles(id: string, roles: Array<string>){
    return http.put<any>(`/users/user_roles/${id}`, roles);
  }

  getAll() {
    return http.get<Array<IUser>>("/users");
  }

  get(id: string) {
    return http.get<IUser>(`/users/${id}`);
  }

  create(data: IUser) {
    return http.post<IUser>("/users", data);
  }

  update(data: IUser, id: any) {
    return http.put<any>(`/users/${id}`, data);
  }

  delete(id: any) {
    return http.delete<any>(`/users/${id}`);
  }

  deleteAll() {
    return http.delete<any>(`/users`);
  }

  findByName(name: string) {
    return http.get<Array<IUser>>(`/users?name=${name}`);
  }
}

export default new UserDataService();