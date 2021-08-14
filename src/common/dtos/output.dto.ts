import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
<<<<<<< HEAD:src/common/dtos/outputdto.ts
export class CoreOutput {
    @Field(type => String, {nullable:true})
=======
export class CoreOutput{
    @Field(type=>String,{nullable:true})
>>>>>>> 7ad6e6fbfef03bfd07be8c5b0363863f00833150:src/common/dtos/output.dto.ts
    error?:string;

    @Field(type => Boolean)
    ok: boolean;
    
}  