import { Field, InputType, ObjectType, PartialType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/output.dto";
import { CreateRestaurantInput } from "src/restaurants/dtos/create-restaurant.dto";
import { CreatePostInput } from "./create-post.dto";

@InputType()
export class EditPostInput extends PartialType(CreatePostInput){
    @Field(type=>Number)
    postId:number;
}

@ObjectType()
export class EditPostOutput extends CoreOutput{}