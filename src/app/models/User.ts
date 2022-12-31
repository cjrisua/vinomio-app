import { Subscribers } from "./Subscribers";

export class User { 
    constructor(
    public id?: string,
    public firstName?: string,
    public lastName?: string,
    public handler?: string,
    public email?: string,
    public password?: string,
    public Subscribers?: Subscribers){}
}