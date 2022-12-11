import { CellarAttribute, Partition } from "./CellarAttribute";
import { User } from "./User";
import { plainToClass } from "class-transformer";

export class Cellar {
    constructor(
        public id: number,
        public name: string,
        public attributes: CellarAttribute,
        public createdAt: Date,
        public Users: User[]
    ){}

    getOwner():string{
        return "Me";
    }
    Partitions(){
        if(this.attributes.partition){
            const serialized = this.attributes.partition.map(data => {
                return plainToClass(Partition,data)
            });
            return serialized
        }
        return []
    }
    

}