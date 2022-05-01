import { Producer } from "./Producer";

export class Wine {
  
    constructor(
        public name : string,
        public producername:string,
        public producer?: Producer,
        public id?:number,
        public varietal?: string,
        public region?: string
        //public releaseprice?:number
    ){}
}