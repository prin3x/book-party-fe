import { useEffect } from "react";
import { createContext, useState } from "react";
import { IUserInformation } from "../services/auth/auth.model";
import { INotificationModel } from "../services/notification/notification.model";
import { _getMyNoti } from "../services/notification/notification.service";

interface IUserContextState {
  userInformation: IUserInformation;
  setUserGlobal: (user: IUserInformation) => void;
  notiList: INotificationModel[];
  setNewNotification: (notification: INotificationModel[]) => void;
  isFetchingAuth: boolean;
  completeFetchAuth: () => void;
}

export const UserContext = createContext({} as IUserContextState);

export function UserProvider(props: any) {
  const [userInformation, setUserInformation] = useState(
    {} as IUserInformation
  );
  const [notiList, setNotiList] = useState<INotificationModel[]>([]);
  const [isFetchingAuth, setIsFetchingAuth] = useState(true);

  const setUserGlobal = (_user: IUserInformation) => {
    setUserInformation(_user);
  };

  const setNewNotification = (_notification: INotificationModel[]) => {
    setNotiList(_notification);
  };

  const completeFetchAuth = () => {
    setIsFetchingAuth(false);
  };

  return (
    <UserContext.Provider
      value={{
        userInformation,
        setUserGlobal,
        notiList,
        setNewNotification,
        isFetchingAuth,
        completeFetchAuth,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
