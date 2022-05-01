import { MasterVarietal } from "./MasterVarietal";
import { Producer } from "./Producer";
import { Region } from "./Region";

export class Wine {
  
    constructor(
        public name : string,
        //public producername:string,
        public producer?: Producer,
        public region?: Region,
        public slug?:string,
        //public producerId?: number,
        public id?:number,
        public mastervarietal?:MasterVarietal,
        public vintages?:any[]
        //public varietal?: string,
        //public region?: string
        //public releaseprice?:number
    ){
    }
}