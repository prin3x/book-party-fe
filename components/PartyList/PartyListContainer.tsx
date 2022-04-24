import React, { useEffect, useState } from "react";
import {
  IPartyDetail,
  IPartyModel,
  IQueryParams,
} from "../../services/party/party.model";
import PartyCard from "./PartyCard";
import * as queryString from "query-string";
import { _findAllParties } from "../../services/party/party.service";
import { formatISO9075 } from "date-fns";

type Props = {};

const INIT_PARTY_QUERY = {
  startDate: formatISO9075(new Date()),
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

  useEffect(() => {
    fetchPartyList(queryParams);
  }, []);

  return (
    <div className="p-10" id="party">
      <div className="text-6xl font-party text-black cursor-pointer text-center my-10">
        Events to <span className="underline">ENJOIN !</span>{" "}
      </div>
      <div className="flex flex-wrap gap-10 max-w-7xl mx-auto">
        {!partyDetails.isLoading &&
          partyDetails.items.map((party) => <PartyCard key={party.id} party={party} />)}
      </div>
    </div>
  );
}

export default PartyListContainer;
