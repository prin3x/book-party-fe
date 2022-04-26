import axios from "axios";
import { INotificationModel } from "./notification.model";

export async function _getMyNoti(): Promise<INotificationModel[]> {
  return await axios.get("/notification").then((res) => res.data).catch((err) => []);
}
