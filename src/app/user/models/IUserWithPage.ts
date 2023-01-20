import { IUser } from "./IUser";

export interface IUserWithPage{
    page : number,
    per_page : number,
    total :number ,
    total_pages : number,
    data : IUser[]
}