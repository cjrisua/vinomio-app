import 'reflect-metadata';
import { Vintage } from "./Vintage";
import { People } from "./People";
import { Tag } from "./Tag";
import { Expose, Type } from "class-transformer";

export class Review {
        @Expose()
        public id?:number;
        @Expose()
        public score?:number;
        @Expose({ name: 'review' })
        public message?:string;
        @Expose({ name: 'updatedAt' })
        @Type(()=>Date) 
        public tastingDate?:Date;
        @Expose()
        public vintage?:Vintage;
        @Expose()
        public people?:People;
        @Expose({ name: 'Tags' })
        @Type(()=>Tag) 
        public tags?: Tag[];
}