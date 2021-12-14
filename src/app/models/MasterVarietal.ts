import { Variety } from "./Variety";

export class MasterVarietal {
    constructor(
        public id: number,
        public name : string,
        public varieties : Variety[]
    ){}
    
}