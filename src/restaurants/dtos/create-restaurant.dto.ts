import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/outputdto";
import { Restaurant } from "../entities/restaurant.entity";



@InputType()
export class CreateRestaurantInput extends PickType(Restaurant, [
    'name',
    'body'
]) {

    @Field(type => String)
    categoryName: string;
}

@ObjectType()
export class CreateRestaurantOutput extends CoreOutput {}