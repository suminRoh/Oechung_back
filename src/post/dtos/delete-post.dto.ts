import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/outputdto";

@InputType()
export class DeletePostInput{
    @Field(type=>Number)
    postId:number;
}

@ObjectType()
export class DeletePostOutput extends CoreOutput{}