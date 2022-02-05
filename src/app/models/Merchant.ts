import { AllocationEvent } from "./AllocationEvent";

export class Merchant{
    constructor(
        public id?:number,
        public name?:string,
        public allocationEvent?: AllocationEvent,
    ){}

}