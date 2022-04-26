export interface INotificationModel {
  id: string;
  content?: string;
  for: string;
  destination?: string;
  type: ENotificationType;
}

export enum ENotificationType {
  USER_JOIN_PARTY = "user_join_party",
  PARTY_CHANGE = "party_change",
}
