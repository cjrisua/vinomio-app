import { Subscribers } from "./Subscribers";

export class User { 
    constructor(
    public id?: string,
    public firstname?: string,
    public lastname?: string,
    public handler?: string,
    public email?: string,
    public password?: string,
    public Subscribers?: Subscribers){}
}