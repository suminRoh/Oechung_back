
import { Args, Mutation,Resolver } from "@nestjs/graphql";
import { AuthUser } from "src/auth/auth-user.decorator";
import { Role } from "src/auth/role.decorator";
import { CoreOutput } from "src/common/dtos/outputdto";
import { User } from "src/users/entity/user.entity";
import { CreatePostInput, CreatePostOutput } from "./dtos/create-post.dto";
import { DeletePostInput, DeletePostOutput } from "./dtos/delete-post.dto";
import { EditPostInput, EditPostOutput } from "./dtos/edit-post.dto";
import { O_Post } from "./entities/O_post.entity";
import { PostService } from "./post.service";

@Resolver(of=>O_Post)
export class PostResolver{
    constructor(private readonly postService:PostService){}

    @Mutation(returns=>CreatePostOutput)
    @Role(['Owner'])
    async createPost(
        @AuthUser() authUser:User,
        @Args('input')
        CreatePostInput:CreatePostInput
    ):Promise<CreatePostOutput>{
        return this.postService.createPost(
            authUser,
            CreatePostInput
        );
    }

    @Mutation(returns=>CoreOutput)
    @Role(['Any'])
    async likePost(
        @Args('input') 
        postId:number
    ):Promise<CoreOutput>{
        return this.postService.likePost(
            postId
        );
    }

    @Mutation(returns=>EditPostOutput)
    @Role(['Owner'])
    async editPost(
        @AuthUser() owner:User,
        @Args('input')
        editPostInput:EditPostInput
    ):Promise<EditPostOutput>{
        return this.postService.editPost(owner,editPostInput);
    }

   @Mutation(returns=>DeletePostOutput)
   @Role(["Owner"])
   deletePost(
       @AuthUser() owner:User,
       @Args('input')
       deletePostInput:DeletePostInput
   ):Promise<DeletePostOutput>{
       return this.postService.deletePost(owner,deletePostInput);
   }
    
    
}
 