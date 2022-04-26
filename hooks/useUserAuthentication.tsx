import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { IUserAuthen, IUserInformation } from "../services/auth/auth.model";
import {
  _checkAuth,
  _userLoginWebsite,
  _userRegister,
} from "../services/auth/auth.service";
import jwtDecode from "jwt-decode";
import { useRouter } from "next/router";

type ReturnProps = {
  onLogin: (_data: IUserAuthen) => void;
  onLogout: () => void;
  onStartApp: () => void;
  onRegister: (_data: IUserAuthen) => void;
};

function useUserAuthentication(): ReturnProps {
  const router = useRouter();
  const { setUserGlobal, userInformation, completeFetchAuth } =
    useContext(UserContext);

  async function onLogin(data: IUserAuthen) {
    try {
      let { access_token } = await _userLoginWebsite(data);
      if (access_token) {
        localStorage.setItem("token", access_token);
        setUserGlobal(jwtDecode(access_token));
      }
      router.push("/");
    } catch (e: any) {
      console.error(e?.response?.message);
    } finally {
      completeFetchAuth();
    }
  }

  async function onStartApp() {
    if (userInformation.username) return;
    try {
      const userFromAuthenCheck: IUserInformation = await _checkAuth();
      if (userFromAuthenCheck) {
        setUserGlobal(userFromAuthenCheck);
      }
    } catch (e: any) {
      console.error(e?.response?.message);
    } finally {
      completeFetchAuth();
    }
  }

  async function onRegister(data: IUserAuthen) {
    try {
      let res = await _userRegister(data);
      if (res.access_token) {
        localStorage.setItem("token", res.access_token);
        setUserGlobal(jwtDecode(res.access_token));
      }
    } catch (e: any) {
      console.error(e?.response?.message);
    } finally {
      completeFetchAuth();
    }
  }

  async function onLogout() {
    try {
      localStorage.removeItem("token");
      setUserGlobal({} as IUserInformation);
      router.push("/login");
    } catch (e: any) {
      console.error(e?.response?.message);
    }
  }

  return {
    onLogin,
    onLogout,
    onRegister,
    onStartApp,
  };
}

export default useUserAuthentication;
