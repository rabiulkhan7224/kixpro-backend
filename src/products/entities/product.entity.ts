import { Column, PrimaryGeneratedColumn } from "typeorm";

export class Product {
    @PrimaryGeneratedColumn('uuid')
    id:string;
    @Column({
        type:"varchar",
        length:256,
        nullable:false
    })
  title: string;
    @Column({
        type:"varchar",
        length:256,
        nullable:false,
        unique:true
    })
  slug: string;
    @Column({
        type:"varchar",
        length:2000,
        nullable:false
    })
 description: string;

 tags: string[];
 
 

}
