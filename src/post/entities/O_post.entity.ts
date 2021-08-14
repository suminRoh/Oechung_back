import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsDate, IsNumber, IsString, Length } from "class-validator";
import { CoreEntity } from "src/common/entities/core.entity";
import { Category } from "src/restaurants/entities/category.entity";
import { User } from "src/users/entity/user.entity";
import { Column, DeleteDateColumn, Entity, ManyToOne, RelationId } from "typeorm";
import { O_category } from "./O_category.entity";

@InputType('PostInputType',{isAbstract:true})
@ObjectType()
@Entity()
export class O_Post extends CoreEntity{

    @Field(is=>String)
    @Column()
    @IsString()
    title:string;

    @Field(is=>String)
    @Column()
    @IsString()
    body:string;

    @Field(is=>Number,{defaultValue:0})
    @Column()
    like?:number;

    @Field(type=>Date)
    @Column()
    @IsDate()
    deadline:Date;


    @Field(type=>O_category)
    @ManyToOne(
        type=>O_category,
        category=>category.posts,
    )
    category:O_category; 

    //restaurant에 user가 있어야함 
    
    @Field(type=>User) 
    @ManyToOne(
        type=>User, 
        user=>user.posts,
        {onDelete:'CASCADE'}
    )
    owner:User;
    
    @RelationId((post:O_Post)=>post.owner)
    ownerId:number;
     

   

}