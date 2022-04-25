import { UserDetail } from "../auth/auth.model";

export interface ICreatePartyModel {
  title: string;
  capacity: number;
  startDate: string;
  duration: number;
  image: File;
  description: string;
}

export interface IPartyModel extends ICreatePartyModel {
  id: string;
  coverImage: string;
  joined: number;
  userDetail: UserDetail;
  isJoined: boolean;
  isOwner: boolean;
}


export interface IUpdatePartyModel extends ICreatePartyModel {
  id: string;
}


export interface IQueryParams {
  page?: number;

  limit?: number;

  orderBy?: string;

  order?: string;

  search?: string;

  title?: string;

  startDate?: string;
}

export interface IPartyDetail {
  items: IPartyModel[];
  total: number;
  itemCount: number;
  page: number;
  isLoading?: boolean;
}

export interface IJoinParty {
  partyId: string;
  totalGuest: number;
}