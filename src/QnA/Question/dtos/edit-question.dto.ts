import { Field, InputType, ObjectType, PartialType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/outputdto";
import { CreateQuestionInput } from "./create-question.dto";


@InputType()
export class EditQuestionInput extends PartialType(CreateQuestionInput) {
    @Field(type => Number)
    questionId : number;
}

@ObjectType()
export class EditQuestionOutput extends CoreOutput {}