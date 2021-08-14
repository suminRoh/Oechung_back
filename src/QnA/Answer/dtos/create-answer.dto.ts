import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/outputdto";
import { Answer } from "../entities/answer.entitiy";


@InputType()
export class CreateAnswerInput extends PickType(Answer, [
    'title',
    'body'
]) {}

@ObjectType()
export class CreateAnswerOutput extends CoreOutput {}