import { Field, InputType, ObjectType } from "@nestjs/graphql";
<<<<<<< HEAD
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
=======
import { EnumDefinitionFactory } from "@nestjs/graphql/dist/schema-builder/factories/enum-definition.factory";
import { IsBoolean, IsOptional, IsString, Length } from "class-validator";
import { FieldsOnCorrectTypeRule } from "graphql";
import { fieldToFieldConfig } from "graphql-tools";
import { CoreEntity } from "src/common/entities/core.entity";
import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Restaurant } from "./restaurant.entity";

@InputType('CategoryInputType',{isAbstract:true})
@ObjectType()
@Entity()
export class Category extends CoreEntity{

    @Field(type=>String)
    @Column({unique:true})
    @IsString()
    @Length(5)
    name:string;

    @Field(type=>String,{nullable:true})
    @Column({nullable:true})
    @IsString()
    coverImg:string;

    @Field(type=>String)
    @Column({unique:true})
    @IsString()
    slug:string;

    @Field(type=>[Restaurant])
    @OneToMany(type=>Restaurant, restaurant=>restaurant.category)
    restaurants: Restaurant[];
 

    
}//is는 아무의미없음 () 로 해도 무관 

//graphql에서 type User은 데이터베이스에서 정보를 가져오는 User
//UserInputType은 input Type으로 사용하는 user
>>>>>>> 7ad6e6fbfef03bfd07be8c5b0363863f00833150
