import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { EnumDefinitionFactory } from "@nestjs/graphql/dist/schema-builder/factories/enum-definition.factory";
import {  IsString, Length } from "class-validator";
import { FieldsOnCorrectTypeRule } from "graphql";
import { fieldToFieldConfig } from "graphql-tools";
import { CoreEntity } from "src/common/entities/core.entity";
import { User } from "src/users/entity/user.entity";
import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId } from "typeorm";
import { Category } from "./category.entity";

@InputType('RestaurantInputType',{isAbstract:true})
@ObjectType()
@Entity()
export class Restaurant extends CoreEntity{

    @Field(is=>String)
    @Column()
    @IsString()
    @Length(5)
    name:string;

    @Field(type=>String)
    @Column()
    @IsString()
    coverImg:string;

    @Field(type=>String,{defaultValue:"강남"})
    @Column()
    address:string;

    @Field(type=>Category,{nullable:true}) //restaurant에 category가 있을수도 없을수도 있음
    @ManyToOne(
        type=>Category, 
        category=>category.restaurants,
        {nullable:true,onDelete:"SET NULL"})
    category:Category

    @Field(type=>User) //restaurant에 user가 있어야함 
    @ManyToOne(
        type=>User, 
        user=>user.restaurants,
        {onDelete:'CASCADE'}
    )
    owner:User;

    @RelationId((restaurant:Restaurant)=>restaurant.owner)
    ownerId:number;

    
}//is는 아무의미없음 () 로 해도 무관 