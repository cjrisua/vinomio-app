import { MasterVarietal } from "./MasterVarietal";
import { Producer } from "./Producer";
import { Region } from "./Region";

export class Wine {
  
    constructor(
        public name : string,
        //public producername:string,
        public Producer?: Producer,
        public Region?: Region,
        public slug?:string,
        //public producerId?: number,
        public id?:number,
        public MasterVarietal?:MasterVarietal,
        public vintages?:any[],
        //public varietal?: string,
        //public region?: string
        //public releaseprice?:number
        public color?:string,
        public type?:string
    ){
    }
}