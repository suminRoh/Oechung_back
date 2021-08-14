import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/outputdto";


@InputType()
export class DeleteAnswerInput {
    @Field(type => Number)
    questionId: number;
}

@ObjectType()
export class DeleteAnswerOutPut extends CoreOutput {}
