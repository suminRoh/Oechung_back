import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/outputdto";
import { Question } from "../entities/question.entity"


@InputType()
export class CreateQuestionInput extends PickType(Question, [
    'title',
    'body'
]) {}

@ObjectType()
export class CreateQuestionOutput extends CoreOutput {}