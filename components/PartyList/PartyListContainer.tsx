import React, { useEffect, useState } from "react";
import {
  IJoinParty,
  IPartyDetail,
  IPartyModel,
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

type Props = {};

const LIMIT_PER_PAGE = 9;

const INIT_PARTY_QUERY = {
  startDate: formatISO9075(new Date()),
  page: 1,
};

function PartyListContainer({}: Props) {
  const [partyDetails, setPartyDetails] = useState<IPartyDetail>({
    isLoading: true,
  } as IPartyDetail);
  const [queryParams, setQueryParams] =
    useState<IQueryParams>(INIT_PARTY_QUERY);

  async function fetchPartyList(query: IQueryParams) {
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
  };

  const onUndoJoinParty = async (_partyId: string) => {
    const set = {} as IJoinParty;
    set.partyId = _partyId;
    await _cancelJoinParty(set);
  };

  useEffect(() => {
    fetchPartyList(queryParams);
  }, []);

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
    </div>
  );
}

export default PartyListContainer;
