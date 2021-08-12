import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/outputdto";

@InputType()
export class DeleteRestaurantInput {
    @Field(type => Number)
    restaurantId: number;
}

@ObjectType()
export class DeleteRestaurantOutPut extends CoreOutput {}
