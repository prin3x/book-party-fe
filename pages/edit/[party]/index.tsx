import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import CreatePartyForm from "../../../components/PartyList/CreatePartyForm";
import { IPartyModel } from "../../../services/party/party.model";
import { _getPartyById } from "../../../services/party/party.service";
import CircularProgress from "@mui/material/CircularProgress";

type Props = {};

function PartyEditor({}: Props) {
  const router = useRouter();
  const [initialFormValues, setInitialFormValues] = useState<IPartyModel>(
    {} as IPartyModel
  );

  const [isCompleteLoading, setIsCompleteLoading] = useState<boolean>(false);

  async function fetchInitialFormValueByQuery(id: string) {
    setIsCompleteLoading(false);
    let res: IPartyModel;
    try {
      res = await _getPartyById(id);
      setInitialFormValues(res);
    } catch (e) {
      router.push("/");
      console.error(e);
    } finally {
      setIsCompleteLoading(true);
    }
  }

  useEffect(() => {
    if (router.query.party && !Array.isArray(router.query.party)) {
      fetchInitialFormValueByQuery(router.query.party);
    }
  }, [router.query.party]);

  if (!isCompleteLoading)
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <CircularProgress />
      </div>
    );

  return (
    <div>
      <CreatePartyForm initialFormValues={initialFormValues} isUpdate={true} />
    </div>
  );
}

export default PartyEditor;
