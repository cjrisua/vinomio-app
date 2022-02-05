export class Distribution{
    constructor(
        public country?:string,
        public max?:number,
        public minAllocation?:number
    ){}
}
export class CellarAttribute{
    constructor(
        public size?:number,
        public distribution?:Distribution[]
    ){}
}