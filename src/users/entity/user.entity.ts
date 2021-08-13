import { Field, InputType, ObjectType, registerEnumType } from "@nestjs/graphql";
import { FieldsOnCorrectTypeRule } from "graphql";
import { CoreEntity } from "src/common/entities/core.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from "typeorm";
import * as bcrypt from 'bcrypt';
import { InternalServerError } from "http-errors";
import { InternalServerErrorException } from "@nestjs/common";
import { IsBoolean, IsEmail, IsEnum, IsString } from "class-validator";
import { Restaurant } from "src/restaurants/entities/restaurant.entity";
import { O_Post } from "src/post/entities/O_post.entity";
export enum UserRole{
    Owner='Owner',
    Client='Client',
    Admin='Admin'
   
}

registerEnumType(UserRole,{name:'UserRole'})

@InputType('UserInputType',{isAbstract:true})
@ObjectType()
@Entity()
export class User extends CoreEntity{

    @Column()
    @Field(type=>String)
    @IsEmail()
    email:string;

    @Column()
    @Field(type=>String)
    @IsString()
    password:string;

    @Field(type=>UserRole)
    @Column({type:'enum',enum:UserRole})
    @IsEnum(UserRole)
    role:UserRole;

    @Column({default:false})
    @Field(type=>Boolean)
    @IsBoolean()
    verified:boolean;

    @Field(type=>[Restaurant])
    @OneToMany(type=>Restaurant, restaurant=>restaurant.owner)
    restaurants: Restaurant[];


    @Field(type=>[O_Post])
    @OneToMany(type=>O_Post, post=>post.title)
    posts: O_Post[]; 
 
    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword():Promise<void>{
        try{
            this.password=await bcrypt.hash(this.password,10);
        }catch(e){
            console.log(e);
            throw new InternalServerErrorException(); 
        }
    }

    async checkPassword(aPassword:string):Promise<boolean>{
        try{
           const ok=await bcrypt.compare(aPassword,this.password); 
           return ok;
        }catch(e){
            console.log(e);
            throw new InternalServerErrorException();
        }
    }
}