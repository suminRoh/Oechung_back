import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/entity/user.entity";
import { Repository } from "typeorm";
import { DefaultSerializer } from "v8";
import { CreateRestaurantInput, CreateRestaurantOutput } from "./dtos/create-restaurant.dto";
import { DeleteRestaurantInput, DeleteRestaurantOutput} from "./dtos/delete-restaurant.dto";
import { EditRestaurantInput, EditRestaurantOutput } from "./dtos/edit-restaurant.dto";
import { Category } from "./entities/category.entity";
import { Restaurant } from "./entities/restaurant.entity";
import { CategoryRepository } from "./repositories/category.repository";

@Injectable()
export class RestaurantService{
    constructor(
        @InjectRepository(Restaurant)
        private readonly restaurants: Repository<Restaurant>,
        private readonly categories: CategoryRepository
        ){} //Restaurant entity의 repository를 inject하는 것, 이름은 restaurants이고 class는 Restaurant entity를 가진 repository (this.restaurants.__ 으로 접근 가능해짐 )


    async createRestaurant(
        owner:User,
        CreateRestaurantInput:CreateRestaurantInput):Promise<CreateRestaurantOutput>{
            try{
                 
                const newRestaurant=this.restaurants.create(CreateRestaurantInput);//code에만 존재하고 DB에 실제로 저장되지는 않음  
                newRestaurant.owner=owner;
                const category=await this.categories.getOrCreate(CreateRestaurantInput.categoryName);
                newRestaurant.category=category;
                await this.restaurants.save(newRestaurant);
                return{
                    ok:true,
                };
            }catch{ 
                return{
                    ok:false,
                    error: "Could not create restaurant"
                }
            }
        
    }

    async editRestaurant(owner:User,editRestaurantInput:EditRestaurantInput):Promise<EditRestaurantOutput>{
       try{
        const restaurant=await this.restaurants.findOneOrFail(editRestaurantInput.restaurantId,{loadRelationIds:true});
        if(!restaurant){
            return{
                ok:false,
                error:"restaurant not found",
            }
        }
        if(owner.id !== restaurant.ownerId){
            return{
                ok:false,
                error:"You can't edit a restaurant that you don't own"
            }
        }
        let category:Category=null;
        if(editRestaurantInput.categoryName){
            category=await this.categories.getOrCreate(editRestaurantInput.categoryName);
        }
        await this.restaurants.save([{
            id:editRestaurantInput.restaurantId,
            ...editRestaurantInput,
            ...(category&&({category}))//category가 존재하면 category return

        }])
        return{ok:true};
        }catch{
            return{
                ok:false,
                error:"Could not edit Restaurant"
            }
        }
    }

    async deleteRestaurant(owner:User,{restaurantId}:DeleteRestaurantInput):Promise<DeleteRestaurantOutput>{
        try{
            const restaurant=await this.restaurants.findOneOrFail(restaurantId);
            if(!restaurant){
                return{
                    ok:false,
                    error:"restaurant not found",
                }
            }
            if(owner.id !== restaurant.ownerId){
                return{
                    ok:false,
                    error:"You can't delete a restaurant that you don't own"
                };
            }
            await this.restaurants.delete(restaurantId);
            return{
                ok:true
            }
        }catch{
            return{
                ok:false,
                error:"Could not delete restaurant"
            }
        }
        
    }
    
}