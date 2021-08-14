
import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/output.dto";
import { O_Post } from "../entities/O_post.entity";

@InputType()
export class CreatePostInput extends PickType(O_Post,[
    'title',
    'body',
    'deadline',
    'like' //like는 front에서 쓰는 칸 만들지 않기 default =0
]){
    @Field(type=>String)
    categoryName:string;
}

@ObjectType()
export class CreatePostOutput extends CoreOutput{}