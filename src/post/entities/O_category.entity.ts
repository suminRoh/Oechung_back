import { Field, InputType, ObjectType, registerEnumType } from '@nestjs/graphql';
import { IsString, Length } from 'class-validator';
import { selectObjectFields } from 'graphql-tools';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { O_Post } from './O_post.entity';

export enum O_categories{
    Facility="Facility",
    Cafeteria="Cafeteria",
    Lecture="Lecture",
    Etc="Etc"
}

registerEnumType(O_categories,{name:'O_categories'})

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class O_category extends CoreEntity {
  @Field(type => String)
  @Column()
  @IsString()
  @Length(5)
  name: string;

  @Field(type=>String)
  @Column({unique:true})
  @IsString()
  slug:string;

  @Field(type => [O_Post])
  @OneToMany(
    type => O_Post,
    post => post.category,
  )
  posts: O_Post[];
}