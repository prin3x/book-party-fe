import React from "react";
import PartyCard from "./PartyCard";

type Props = {};

const partyList = [
  {
    id: "1",
    name: "party1",
    capabilities: 20,
    current: 15,
    endDate: new Date().toDateString(),
  },
  {
    id: "2",
    name: "party1",
    capabilities: 20,
    current: 15,
    endDate: new Date().toDateString(),
  },
  {
    id: "3",
    name: "party1",
    capabilities: 20,
    current: 15,
    endDate: new Date().toDateString(),
  },
  {
    id: "4",
    name: "party1",
    capabilities: 20,
    current: 15,
    endDate: new Date().toDateString(),
  },
  {
    id: "5",
    name: "party1",
    capabilities: 20,
    current: 15,
    endDate: new Date().toDateString(),
  },
];

function PartyListContainer({}: Props) {
  return (
    <div className="p-10" id="party">
    <div className="p-5 text-center font-bold text-5xl uppercase">Party List</div>
      <div className="flex flex-wrap gap-10 max-w-7xl mx-auto">
        {partyList.map((party) => (
          <PartyCard key={party.id} />
        ))}
      </div>
    </div>
  );
}

export default PartyListContainer;
