import axios from "axios";
import { IUserAuthen } from "./auth.model";

export async function _userLoginWebsite(userI: IUserAuthen) {
  return await axios.post("/auth/login", { ...userI }).then(res => res.data);
}

export async function _checkAuth() {
  return await axios.get("/auth/checkauth").then(res => res.data);
}

export async function _userRegister(userI: IUserAuthen) {
  return await axios.post("/auth/register", { ...userI }).then(res => res.data);
}
