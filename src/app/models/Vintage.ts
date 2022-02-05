import { Wine } from "./Wine";

export class Vintage{
    constructor(
        public id:number,
        public year:number,
        public name:string,
        public Wine:Wine
    ){}
}