import { Wine } from "./Wine";

export class AllocationEventOffer{
    constructor(
        //public id?:number,
        //public wine?:Wine,
        public wineId?:number,
        public allocationEventId?:number,
        public releasePrice?:number
    ){}
}