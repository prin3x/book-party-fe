import React from "react";
import LayoutHOC from "../../components/Layout/LayoutHOC";
import CreatePartyForm from "../../components/PartyList/CreatePartyForm";

type Props = {};

function CreatePartyIndex({}: Props) {
  return (
    <LayoutHOC>
      <CreatePartyForm />
    </LayoutHOC>
  );
}

export default CreatePartyIndex;
