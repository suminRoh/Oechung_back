import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/outputdto";


@InputType()
export class DeleteQuestionInput {
    @Field(type => Number)
    questionId : number;
}

@ObjectType()
export class DeleteQuestionOutput extends CoreOutput {}