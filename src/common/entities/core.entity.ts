import { Field } from "@nestjs/graphql";
import { CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export class CoreEntity{
    @PrimaryGeneratedColumn()
    @Field(type=>Number)
    id:number;

    @CreateDateColumn()
    @Field(type=>Date)
    createdAt:Date;

    @UpdateDateColumn()
    @Field(type=>Date)
    updatedAt:Date;

    @DeleteDateColumn()
    @Field(type=>Date)
    deletedAt:Date;
}