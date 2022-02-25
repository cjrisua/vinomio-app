export class Allocation{
    constructor(
        public id?:number,
        public merchantId?: number,
        public status?:string,
        public memberSince?:Date,
        public lastPurchase?:Date,
    ){}
}