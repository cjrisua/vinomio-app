import { AllocationEvent } from "./AllocationEvent";
import { Merchant } from "./Merchant";

export class Allocation{
    constructor(
        public id?:number,
        public merchantId?: number,
        public status?:string,
        public memberSince?:Date,
        public lastPurchase?:Date,
        public merchant?:Merchant,
        public events?:AllocationEvent[]
    ){}
}