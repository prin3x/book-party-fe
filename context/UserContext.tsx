import { createContext, useState } from "react";
import { IUserInformation } from "../services/auth/auth.model";

interface IUserContextState {
  userInformation: IUserInformation;
  setUserGlobal: (user: IUserInformation) => void;
}

export const UserContext = createContext({} as IUserContextState);

export function UserProvider(props: any) {
  const [userInformation, setUserInformation] = useState(
    {} as IUserInformation
  );

  const setUserGlobal = (_user: IUserInformation) => {
    setUserInformation(_user);
  };
  return (
    <UserContext.Provider value={{ userInformation, setUserGlobal }}>
      {props.children}
    </UserContext.Provider>
  );
}
