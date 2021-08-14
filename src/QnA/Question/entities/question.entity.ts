import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsString, Length } from "class-validator";
import { CoreEntity } from "src/common/entities/core.entity";
import { Answer } from "src/QnA/Answer/entities/answer.entitiy";
import { User } from "src/users/entity/user.entity";
import { Column, Entity, ManyToOne, OneToOne, RelationId } from "typeorm";


@InputType('QuestionInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Question extends CoreEntity {

    @Field(is => String)
    @Column()
    @IsString()
    @Length(30)
    title: string;

    @Field(is => String)
    @Column()
    @IsString()
    @Length(100)
    body: string;

    @Field(type => Answer, {nullable: true})
    @OneToOne(
        type => Answer,
        answer => answer.questions,
        { nullable: true, onDelete: "SET NULL"}
    )
    answer: Answer;
    
    @Field(type => User)
    @ManyToOne(
        type => User,
        user => user.questions,
        {onDelete: "CASCADE"},
    )
    owner: User;

    @RelationId((question: Question) => question.owner)
    ownerId: number;
}