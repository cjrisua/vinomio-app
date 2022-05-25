import { AllocationEvent } from "./AllocationEvent";
import { Merchant } from "./Merchant";

export class Collection {
    constructor(
        public id ?: number,
        public vintageId ?: number,
        public vintage ?: string,
        public wineId ?: string,
        public statusId ?: string,
        public cellarId ?: number,
        public price?: number,
        public locationId: number = 0,
        public acquiringSourceId: number = 0,
        public allocationEventId: number = 0,
        public merchant?: Merchant,
        public allocation?: AllocationEvent,
        public purchaseNote?: string,
        public bottleSize?:string,
        public bottleCount?:number,
        public deliverBy?:string,
        public purchasedOn?:string
    ){}
}