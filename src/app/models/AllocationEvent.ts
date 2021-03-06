import { Allocation } from "./Allocation";

export class AllocationEvent{
    constructor(
        public id?:number,
        public slug?:string,
        public name?:string,
        public allocationId?:number,
        public collectionId?:number,
        public eventId?:number,
        public createdAt?:Date,
        public updatedAt?:Date,
        public allocation?:Allocation,
        public month?:string,
        public lastPurchase?:Date
    ){}
}