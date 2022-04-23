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
  isFetching: boolean;
};

function useUserAuthentication(): ReturnProps {
  const router = useRouter();
  const [isFetching, setIsFetching] = useState(false);
  const { setUserGlobal, userInformation } = useContext(UserContext);

  async function onLogin(data: IUserAuthen) {
    setIsFetching(true);
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
      setIsFetching(false);
    }
  }

  async function onStartApp() {
    if(userInformation.username) return;
    setIsFetching(true);
    try {
      const userInformation: IUserInformation = await _checkAuth();
      if (userInformation) {
        setUserGlobal(userInformation);
      }
    } catch (e: any) {
      console.error(e?.response?.message);
    } finally {
      setIsFetching(false);
    }
  }

  async function onRegister(data: IUserAuthen) {
    setIsFetching(true);
    try {
      let { access_token } = await _userRegister(data);
      if (access_token) {
        localStorage.setItem("token", access_token);
        setUserGlobal(jwtDecode(access_token));
      }
      router.push("/");
    } catch (e: any) {
      console.error(e?.response?.message);
    } finally {
      setIsFetching(false);
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
    isFetching,
    onRegister,
    onStartApp,
  };
}

export default useUserAuthentication;
