import { Field, InputType, ObjectType } from "@nestjs/graphql";
<<<<<<< HEAD
import { IsString, Length } from "class-validator";
import { CoreEntity } from "src/common/entities/core.entity";
import { User } from "src/users/entity/user.entity";
import { Column, Entity, ManyToOne, OneToOne, RelationId } from "typeorm";
import { Category } from "./category.entity";

@InputType('RestaurantInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Restaurant extends CoreEntity { //Question
=======
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
>>>>>>> 7ad6e6fbfef03bfd07be8c5b0363863f00833150

    @Field(is=>String)
    @Column()
    @IsString()
    @Length(5)
    name: string; //제목

    @Field(type=>String)
<<<<<<< HEAD
=======
    @Column()
    @IsString()
    coverImg:string;

    @Field(type=>String,{defaultValue:"강남"})
>>>>>>> 7ad6e6fbfef03bfd07be8c5b0363863f00833150
    @Column()
    @IsString()
    @Length(100)
    body :string; //본문

    @Field(type => Category, { nullable: true })
    @OneToOne(
        type => Category,
        category => category.restaurants,
        { nullable: true , onDelete: 'SET NULL'}
    )
    category: Category;

    @Field(type => User) //작성자
    @ManyToOne(
        type => User,
        user => user.restaurants,
        {onDelete: 'CASCADE'},
    )
    owner: User;

<<<<<<< HEAD
    @RelationId((restaurant: Restaurant) => restaurant.owner)
    ownerId: number;
}
//Q와 A가 one-to-one 관계
=======
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
>>>>>>> 7ad6e6fbfef03bfd07be8c5b0363863f00833150
