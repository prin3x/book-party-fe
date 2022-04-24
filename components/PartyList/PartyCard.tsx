import React, { useContext } from "react";
import { IPartyModel } from "../../services/party/party.model";
import { SaveIcon } from "@heroicons/react/outline";
import LoadingButton from "@mui/lab/LoadingButton";
import Image from "next/image";
import { Button } from "@mui/material";

type Props = {
  party: IPartyModel;
  onJoinParty: (id: string) => void;
  onUndoJoinParty: (id: string) => void;
};

function PartyCard({ party, onJoinParty, onUndoJoinParty }: Props) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const onPressJoin = async (id: string) => {
    setIsLoading(true);
    try {
      await onJoinParty(id);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  console.log(party, "party");

  return (
    <div className="flex self-start">
      <div className="rounded-lg shadow-lg bg-white max-w-sm h-full min-h-full min-w-sm">
        <Image
          className="rounded-t-lg"
          src={party.coverImage}
          alt=""
          width={384}
          height={195}
        />
        <div className="p-6 h-48 max-h-48">
          <div className="flex justify-between">
            <h5 className="text-gray-900 text-xl font-medium mb-2">
              {party.title}
            </h5>
            <h5 className="text-gray-900 text-sm font-medium mb-2">
              - {party.userDetail.username}
            </h5>
          </div>
          <p className="text-gray-700 text-base mb-4">{party.description}</p>

          <div className="mt-8">
            <div className="w-full text-right">
              {`Join ${party.joined} / ${party.capacity}`}
            </div>
            {!party.isJoined && !party.isOwner ? (
              <LoadingButton
                onClick={() => onPressJoin(party.id)}
                type="submit"
                className="w-full text-xl px-6 py-2.5 bg-red-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
                loading={isLoading}
                loadingPosition="start"
                startIcon={<SaveIcon />}
                sx={{
                  backgroundColor: "rgb(255, 0, 0)",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "rgb(155, 0, 0)",
                  },
                }}
              >
                Join
              </LoadingButton>
            ) : party.isJoined ? (
              <LoadingButton
                onClick={() => onUndoJoinParty(party.id)}
                type="submit"
                className="w-full text-xl px-6 py-2.5 bg-lime-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-lime-700 hover:shadow-lg focus:bg-lime-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-lime-800 active:shadow-lg transition duration-150 ease-in-out"
                loading={isLoading}
                loadingPosition="start"
                startIcon={<SaveIcon />}
                sx={{
                  backgroundColor: "rgb(255, 0, 0)",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "rgb(155, 0, 0)",
                  },
                }}
              >
                Cancel
              </LoadingButton>
            ) : (
              <Button
                className="w-full text-xl px-6 py-2.5 bg-black text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out"
                variant="contained"
                sx={{
                  backgroundColor: "rgba(0, 0, 0)",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "rgb(0, 0, 0)",
                  },
                }}
              >
                Manage
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PartyCard;
