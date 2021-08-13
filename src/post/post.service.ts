import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CoreOutput } from 'src/common/dtos/outputdto';
import { User } from 'src/users/entity/user.entity';
import { Repository } from 'typeorm';
import { CreatePostInput, CreatePostOutput } from './dtos/create-post.dto';
import { DeletePostInput, DeletePostOutput } from './dtos/delete-post.dto';
import { EditPostInput, EditPostOutput } from './dtos/edit-post.dto';
import { O_category } from './entities/O_category.entity';
import { O_Post } from './entities/O_post.entity';
import { O_categoryRepository } from './repositories/O_category.repository';


@Injectable()
export class PostService {
    constructor(
        @InjectRepository(O_Post)
        private readonly posts: Repository<O_Post>,
        
        private readonly categories: O_categoryRepository
    ){}

    async createPost(
        owner:User,
        CreatePostInput:CreatePostInput
    ):Promise<CreatePostOutput>{
        try{
            const newPost=this.posts.create(CreatePostInput);
            newPost.owner=owner;
            const category=await this.categories.getOrCreate(CreatePostInput.categoryName);
            newPost.category=category;
            console.log("HERE!!!!!!!!!!",newPost.like);
            await this.posts.save(newPost);
            return{
                ok:true
            };
        }catch{
            return{
                ok:false,
                error:"Could not create post"
            };
        }
    }
    async likePost(
        postId:number
    ):Promise<CoreOutput>{
        try{
            const post=await this.posts.findOne(postId,{loadRelationIds:true});
            if(!post){
                return{
                    ok:false,
                    error:"post not found"
                }
            }
            const likecount=await post.like+1;
            post.like=likecount;
            await this.posts.save(post);
            
            return{
                ok:true
            }
        }catch{
            return{
                ok:false,
                error:"you can't like a post"
            }
        }
    }


    async editPost(owner:User,editPostInput:EditPostInput):Promise<EditPostOutput>{
        try{
            const post=await this.posts.findOneOrFail(editPostInput.postId,{loadRelationIds:true});
            if(!post){
                return{
                    ok:false,
                    error:"post not found",
                }
            }
            if(owner.id!== post.ownerId){
                return{
                    ok:false,
                    error:"You can't edit a post that you don't own"
                }
            }
            let category:O_category=null;
            if(editPostInput.categoryName){
                category=await this.categories.getOrCreate(editPostInput.categoryName);
            }
            await this.posts.save([{
                id:editPostInput.postId,
                ...editPostInput,
                ...(category&&({category}))
            }])
            return{ok:true};
        }catch{
            return{
                ok:false,
                error:"Could not edit Post"
            }
        }
    }

    async deletePost(owner:User,{postId}:DeletePostInput)
    :Promise<DeletePostOutput>{
        try{
            const post=await this.posts.findOneOrFail(postId);
            if(!post){
                return{
                    ok:false,
                    error:"post not found"
                }
            }
            if(owner.id!==post.ownerId){
                return{
                    ok:false,
                    error:"You can't delete a post that you don't own"
                };
            }
            await this.posts.delete(postId);
            return{
                ok:true
            }
        }catch{
            return{
                ok:false,
                error:"Could not delete post"
            }
        }
    }
}
