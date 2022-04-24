export interface IUserAuthen {
    username: string;
    password: string;
}


export interface IUserInformation {
    username: string;
    id: string;
}


export interface UserDetail {
    id: number;
    username: string;
    email?: string;
    createdDate: Date;
    updatedDate: Date;
}
