import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsString, Length } from "class-validator";
import { CoreEntity } from "src/common/entities/core.entity";
import { Question } from "src/QnA/Question/entities/question.entity";
import { User } from "src/users/entity/user.entity";
import { Column, Entity, ManyToOne, OneToOne, RelationId } from "typeorm";


@InputType('AnswerInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Answer extends CoreEntity {

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

    @Field(type => User)
    @ManyToOne(
        type => User,
        user => user.answers,
        {onDelete: "CASCADE"},
    )
    owner: User;

    @Field(type => [Question])
    @OneToOne(type => Question, question => question.answer)
    questions: Question[];

    @RelationId((answer: Answer) => answer.owner)
    ownerId: number;
}