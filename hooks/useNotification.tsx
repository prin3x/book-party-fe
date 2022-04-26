import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { INotificationModel } from "../services/notification/notification.model";
import { _getMyNoti } from "../services/notification/notification.service";

type Props = {};

type ReturnProps = {
  fetchMyNoti: () => void;
  isLoading: boolean;
};

function useNotification(): ReturnProps {
  const [isFetching, setIsFetching] = useState(false);
  const { setNewNotification } = useContext(UserContext);

  async function fetchMyNoti() {
    setIsFetching(true);
    let res: INotificationModel[];
    try {
      res = await _getMyNoti();
      setNewNotification(res);
    } catch (e) {
      console.error(e);
    } finally {
      setIsFetching(false);
    }
  }

  return {
    fetchMyNoti,
    isLoading: isFetching,
  };
}

export default useNotification;
