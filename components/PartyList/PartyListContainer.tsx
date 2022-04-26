import React, { useContext, useEffect, useState } from "react";
import {
  IJoinParty,
  IPartyDetail,
  IQueryParams,
} from "../../services/party/party.model";
import PartyCard from "./PartyCard";
import * as queryString from "query-string";
import {
  _cancelJoinParty,
  _findAllParties,
  _joinParty,
} from "../../services/party/party.service";
import { formatISO9075 } from "date-fns";
import Pagination from "@mui/material/Pagination";
import io from "socket.io-client";
import CustomizedSnackbars, {
  ESeverity,
  SnackbarProps,
} from "../Utils/CustomSnack";
import useUserAuthentication from "../../hooks/useUserAuthentication";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { UserContext } from "../../context/UserContext";

type Props = {};

const LIMIT_PER_PAGE = 9;

const INIT_PARTY_QUERY = {
  startDate: formatISO9075(new Date()),
  page: 1,
};

let socket: any;

function PartyListContainer({}: Props) {
  const { isFetchingAuth } = useContext(UserContext);
  const [partyDetails, setPartyDetails] = useState<IPartyDetail>({
    isLoading: true,
  } as IPartyDetail);
  const [queryParams, setQueryParams] =
    useState<IQueryParams>(INIT_PARTY_QUERY);
  const [snackbarProps, setSnackbarProps] = useState<SnackbarProps>({
    open: false,
  } as SnackbarProps);

  const socketInitializer = async () => {
    socket = io("http://localhost:4000");

    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("userJoinEvent", (msg: any) => console.log(msg));
  };

  useEffect(() => {
    socketInitializer();
  }, []);

  async function fetchPartyList(query: IQueryParams = queryParams) {
    const stringQuery: string = queryString.stringify(query);

    let res: IPartyDetail = {} as IPartyDetail;

    res.isLoading = true;

    try {
      res = await _findAllParties(stringQuery);

      res.isLoading = false;

      setQueryParams(query);

      setPartyDetails(res);
    } catch (e) {
      console.error(e);
    }
  }

  const onChangePage = (_page: number) => {
    setQueryParams((prev) => {
      const newQuery = { ...prev, page: _page };
      fetchPartyList(newQuery);
      return newQuery;
    });
  };

  const onJoinParty = async (_partyId: string) => {
    const set = {} as IJoinParty;
    set.partyId = _partyId;
    set.totalGuest = 1;
    await _joinParty(set);
    await fetchPartyList();

    setSnackbarProps({
      open: true,
      onClose: () => setSnackbarProps({ ...snackbarProps, open: false }),
      severity: ESeverity.SUCCESS,
      message: "Congratulations! You've successfully join",
    });

    socket.emit("userJoinParty");
  };

  const onUndoJoinParty = async (_partyId: string) => {
    const set = {} as IJoinParty;
    set.partyId = _partyId;
    await _cancelJoinParty(set);
    await fetchPartyList();
  };

  useEffect(() => {
    fetchPartyList(queryParams);
  }, []);


  if (isFetchingAuth)
    return (
      <div className="flex justify-center items-center w-screen h-screen">
        <CircularProgress />
      </div>
    );

  return (
    <div className="p-10" id="party">
      <div className="text-6xl font-party text-black text-center my-10">
        Events to <span className="text-8xl text-red-600">ENJOIN</span>
      </div>
      <div className="flex justify-center w-full">
        <div className="flex flex-wrap gap-10 md:w-full sm:w-3/5 max-w-7xl justify-start">
          {!partyDetails.isLoading &&
            partyDetails.items.map((party) => (
              <PartyCard
                key={party.id}
                party={party}
                onJoinParty={onJoinParty}
                onUndoJoinParty={onUndoJoinParty}
              />
            ))}
          <div className="flex justify-end pt-10 w-full pr-10">
            <Pagination
              count={
                partyDetails.total
                  ? Math.ceil(partyDetails.total / LIMIT_PER_PAGE)
                  : 1
              }
              variant="outlined"
              shape="rounded"
              onChange={(_, page) => onChangePage(page)}
            />
          </div>
        </div>
      </div>
      {snackbarProps.open && <CustomizedSnackbars {...snackbarProps} />}
    </div>
  );
}

export default PartyListContainer;
