import Image from "next/image";
import React from "react";
import { IPartyModel } from "../../services/party/party.model";

type Props = {
  party: IPartyModel
};

function PartyCard({party}: Props) {
  console.log(party)
  return (
    <div className="flex self-start">
      <div className="rounded-lg shadow-lg bg-white max-w-sm h-96 min-h-full min-w-sm">
        <a href="#!" data-mdb-ripple="true" data-mdb-ripple-color="light">
          <img
            className="rounded-t-lg"
            src={party.coverImage}
            alt=""
          />
        </a>
        <div className="p-6">
          <h5 className="text-gray-900 text-xl font-medium mb-2">Card title</h5>
          <p className="text-gray-700 text-base mb-4">
            Some quick example text to build on the card title and make up the
            bulk of the card&apos;s content.
          </p>
          <button
            type="button"
            className=" inline-block text-xl px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            Join
          </button>
        </div>
      </div>
    </div>
  );
}

export default PartyCard;
