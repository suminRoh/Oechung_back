import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsString, Length } from "class-validator";
import { CoreEntity } from "src/common/entities/core.entity";
import { Column, Entity, OneToOne } from "typeorm";
import { Restaurant } from "./restaurant.entity";

@InputType('CategoryInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Category extends CoreEntity { //Answer
    
    @Field(is=>String)
    @Column({unique: true})
    @IsString()
    @Length(5)
    name: string; //제목

    @Field(type => String)
    @Column()
    @IsString()
    body: string;

    @Field(type => [Restaurant])
    @OneToOne(type => Restaurant, restaurant => restaurant.category)
    restaurants: Restaurant[];
}