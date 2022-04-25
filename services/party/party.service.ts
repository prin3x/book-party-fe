import axios from "axios";
import { ICreatePartyModel, IJoinParty, IPartyModel, IUpdatePartyModel } from "./party.model";

export async function _findAllParties(query: string) {
  return await axios.get(`/party?${query}`).then((res) => res.data);
}

export async function _createParty(_partyDetail: ICreatePartyModel) {
  let formData = new FormData();
  formData.append("title", _partyDetail.title);
  formData.append("description", _partyDetail.description);
  formData.append("capacity", _partyDetail.capacity.toString());
  formData.append("image", _partyDetail.image);
  formData.append("duration", _partyDetail.duration.toString());
  formData.append("startDate", _partyDetail.startDate);

  const config = {
    url: `/party/create`,
    data: formData,
  };
  return await axios.post(config.url, config.data).then((res) => res.data);
}

export async function _getPartyById(id: string): Promise<IPartyModel> {
  return await axios.get(`/party/single/${id}`).then((res) => res.data);
}

export async function _updateParty(_partyDetail: IUpdatePartyModel) {
  let formData = new FormData();
  formData.append("title", _partyDetail.title);
  formData.append("description", _partyDetail.description);
  formData.append("capacity", _partyDetail.capacity.toString());
  formData.append("image", _partyDetail.image);
  formData.append("duration", _partyDetail.duration.toString());
  formData.append("startDate", _partyDetail.startDate);

  const config = {
    url: `/party/update/${_partyDetail.id}`,
    data: formData,
  };
  return await axios.patch(config.url, config.data).then((res) => res.data);
}

export async function _removeParty(id: string) {
  return await axios.delete(`/party/${id}`);
}

export async function _joinParty(_joinDetail: IJoinParty) {
  return await axios.post(`/join`, { ..._joinDetail });
}

export async function _cancelJoinParty(_joinDetail: IJoinParty) {
  return await axios.post(`/join/undo`, { ..._joinDetail });
}
