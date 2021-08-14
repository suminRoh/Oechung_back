import { Field, InputType, ObjectType } from "@nestjs/graphql";
<<<<<<< HEAD
import { CoreOutput } from "src/common/dtos/outputdto";

@InputType()
export class DeleteRestaurantInput {
    @Field(type => Number)
    restaurantId: number;
}

@ObjectType()
export class DeleteRestaurantOutPut extends CoreOutput {}
=======
import { CoreOutput } from "src/common/dtos/output.dto";

@InputType()
export class DeleteRestaurantInput{
    @Field(type=>Number)
    restaurantId:number;
}

@ObjectType()
export class DeleteRestaurantOutput extends CoreOutput{}
>>>>>>> 7ad6e6fbfef03bfd07be8c5b0363863f00833150
