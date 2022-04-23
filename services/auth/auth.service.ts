import axios from "axios";
import { IUserAuthen } from "./auth.model";

export async function _userLoginWebsite(userI: IUserAuthen) {
  return axios.post("/auth/login", { ...userI }).then(res => res.data);
}

export async function _checkAuth() {
  return axios.get("/auth/checkauth").then(res => res.data);
}

export async function _userRegister(userI: IUserAuthen) {
  return axios.post("/auth/register", { ...userI }).then(res => res.data);
}
