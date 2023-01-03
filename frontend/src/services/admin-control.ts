import UserService from "./user.service";
import EventBus from "../common/EventBus";

export default async function isAdmin(): Promise<boolean> {
    let auth = false;
    try {
      const response = await UserService.getAdminBoard();
      if (response.status == 200) {
        auth = true;
      }
    } catch (error:any) {
      if (error.response && error.response.status === 401) {
        EventBus.dispatch("logout");
      }
      auth = false;
    }
    return auth;
  }
  