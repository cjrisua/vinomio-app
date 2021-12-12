import { Country } from "./Country";

export class Region {
    constructor(
        public id: number,
        public name : string,
        public country: Country,
        public terroir:string
    ){}
}