import axios from "axios";
import { ICreatePartyModel, IPartyModel } from "./party.model";

export async function _findAllParties(query: string) {
  return await axios.get(`/party?${query}`).then((res) => res.data);
}

export async function _createParty(_partyDetail: ICreatePartyModel) {
  let formData = new FormData();
  formData.append("title", _partyDetail.title);
  formData.append("capacity", _partyDetail.capacity.toString());
  formData.append("image", _partyDetail.image);
  formData.append("duration", _partyDetail.duration.toString());
  formData.append("startDate", _partyDetail.startDate);

  const config = {
    url: `/party/create`,
    data: formData,
  };
  return axios.post(config.url, config.data).then((res) => res.data);
}

export async function _updateParty(_partyDetail: IPartyModel) {
  return await axios.patch(`/party/${_partyDetail.id}`, { ..._partyDetail });
}

export async function _removeParty(id: string) {
  return await axios.delete(`/party/${id}`);
}
