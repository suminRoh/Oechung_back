import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Restaurant{
    @Field(is=>String)
    name:string;
    @Field(type=>Boolean,{nullable:true})
    isVegan?:Boolean;

    @Field(type=>String)
    address:string;

    @Field(type=>String)
    ownerName:string;
    

    
}//is는 아무의미없음 () 로 해도 무관 