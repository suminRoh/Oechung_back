import { Field, InputType, ObjectType, PartialType} from "@nestjs/graphql";
<<<<<<< HEAD
import { CoreOutput } from "src/common/dtos/outputdto";
import { CreateRestaurantInput } from "./create-restaurant.dto";


@InputType()
export class EditRestaurantInput extends PartialType(CreateRestaurantInput) {

    @Field(type => Number)
    restaurantId:  number;
}

@ObjectType()
export class EditRestaurantOutput extends CoreOutput {}
=======
import { CoreOutput } from "src/common/dtos/output.dto";
import { CreateRestaurantInput } from "./create-restaurant.dto";

@InputType()
export class EditRestaurantInput extends PartialType(CreateRestaurantInput){
    @Field(type=>Number)
    restaurantId:number;
}

@ObjectType()
export class EditRestaurantOutput extends CoreOutput{}
>>>>>>> 7ad6e6fbfef03bfd07be8c5b0363863f00833150
