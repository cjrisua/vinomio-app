export class Distribution{
    constructor(
        public country?:string,
        public max?:number,
        public minAllocation?:number
    ){}
}
export class Partition{
    constructor(
        public id?:string,
        public groupkey?:string,
        public name?:string,
        public count?:number,
        public segment?:number
    ){}
}
export class CellarAttribute{
    constructor(
        public name:string = "cellar",
        public capacity?:number,
        public distribution?:Distribution[],
        public partition?:Partition[]
    ){}
}