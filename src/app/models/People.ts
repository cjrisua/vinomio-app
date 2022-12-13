import { Expose } from "class-transformer";

export class People {
    @Expose()
    public id!:number;
    @Expose()
    public name!:string;
    @Expose()
    public role!:string;
    @Expose()
    public email!:string;
    
}