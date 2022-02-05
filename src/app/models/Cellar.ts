import { CellarAttribute } from "./CellarAttribute";
import { User } from "./User";

export class Cellar {
    constructor(
        public id: number,
        public attributes: CellarAttribute,
        public createdAt: Date,
        public Users: User[]
    ){}

    getOwner():string{
        return "Me";
    }
}