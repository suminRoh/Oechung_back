import { Field, InputType, ObjectType, PartialType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/outputdto";
import { CreateAnswerInput } from "./create-answer.dto";


@InputType()
export class EditAnswerInput extends PartialType(CreateAnswerInput) {
    @Field(type => Number)
    questionId: number;
}

@ObjectType()
export class EditAnswerOutput extends CoreOutput {}