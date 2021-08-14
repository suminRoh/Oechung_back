<<<<<<< HEAD
import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/outputdto";
=======
import { ArgsType, Field, InputType, ObjectType, OmitType, PickType } from "@nestjs/graphql";
import { IsBoolean, IsString, Length } from "class-validator";
import { CoreOutput } from "src/common/dtos/output.dto";
import { StringLiteral } from "ts-morph";
>>>>>>> 7ad6e6fbfef03bfd07be8c5b0363863f00833150
import { Restaurant } from "../entities/restaurant.entity";



@InputType()
<<<<<<< HEAD
export class CreateRestaurantInput extends PickType(Restaurant, [
    'name',
    'body'
]) {

    @Field(type => String)
    categoryName: string;
}

@ObjectType()
export class CreateRestaurantOutput extends CoreOutput {}
=======
export class CreateRestaurantInput extends PickType(Restaurant,[
    'name',
    'coverImg',
    'address',
] ) {

    @Field(type=>String)
    categoryName:string;
}//omit type으로 특정 객체는 빼줌

@ObjectType()
export class CreateRestaurantOutput extends CoreOutput{}
//Restaurant는 objectType인데 omittype은 InputType허용 => 2번째 인자로 decorator 전달해주면 그 decorator로 변환시켜줌 
>>>>>>> 7ad6e6fbfef03bfd07be8c5b0363863f00833150
