import React from "react";
import LayoutHOC from "../../components/Layout/LayoutHOC";
import CreatePartyForm from "../../components/PartyList/CreatePartyForm";
import Head from 'next/head'

type Props = {};

function CreatePartyIndex({}: Props) {
  return (
    <>
    <Head>
      <title>Create Party!</title>
    </Head>
    <LayoutHOC>
      <CreatePartyForm />
    </LayoutHOC>
    </>
  );
}

export default CreatePartyIndex;
