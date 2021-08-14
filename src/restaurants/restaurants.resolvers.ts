import { SetMetadata } from '@nestjs/common';
<<<<<<< HEAD
import {Args, Mutation,Resolver} from '@nestjs/graphql';
import { User, UserRole } from 'src/users/entity/user.entity';
import { CreateRestaurantInput, CreateRestaurantOutput} from './dtos/create-restaurant.dto';
=======
import {Args, Mutation, Query,Resolver} from '@nestjs/graphql';
import { create } from 'domain';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { Role } from 'src/auth/role.decorator';
import { User, UserRole } from 'src/users/entity/user.entity';
import { ThrowStatement } from 'ts-morph';
import { CreateRestaurantInput, CreateRestaurantOutput} from './dtos/create-restaurant.dto';
import { DeleteRestaurantInput, DeleteRestaurantOutput } from './dtos/delete-restaurant.dto';
import { EditRestaurantInput, EditRestaurantOutput } from './dtos/edit-restaurant.dto';

>>>>>>> 7ad6e6fbfef03bfd07be8c5b0363863f00833150
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantService } from './restaurants.service';
import { Role } from 'src/auth/role.decorator';
import { EditRestaurantInput, EditRestaurantOutput } from './dtos/edit-restaurant.dto';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { DeleteRestaurantInput, DeleteRestaurantOutPut } from './dtos/delete-restaurant.dto';

@Resolver(of=>Restaurant)
export class RestaurantsResolver{
<<<<<<< HEAD
    constructor(private readonly restaurantService:RestaurantService)
    {}

    @Mutation(returns=> CreateRestaurantOutput)
    @SetMetadata("role", UserRole.Client)
    @Role(['Client'])
    async createRestaurant(
        authUser: User,
        @Args('input') createRestaurantInput: CreateRestaurantInput,
    ): Promise<CreateRestaurantOutput> {
        return this.restaurantService.createRestaurant(
            authUser,
            createRestaurantInput,
        );
    } 

    @Mutation(returns => EditRestaurantOutput)
    @Role(["Client"])
    editRestaurant(
        @AuthUser() owner: User,
        @Args('input') editRestaurantInput: EditRestaurantInput
    ): Promise<EditRestaurantOutput> {
        return this.restaurantService.editRestaurant(owner, editRestaurantInput);
    }

    @Mutation(returns => DeleteRestaurantOutPut)
    @Role(['Owner'])
    deleteRestaurant(
        @AuthUser() owner: User,
        @Args('input') deleteRestaurantInput: DeleteRestaurantInput,
    ): Promise<DeleteRestaurantOutPut> {
        return this.deleteRestaurant(owner, deleteRestaurantInput);
=======
    constructor(private readonly restaurantService:RestaurantService){}

    @Mutation(returns=>CreateRestaurantOutput) 
    @Role(['Owner'])
    async createRestaurant(
        @AuthUser() authUser:User,
        @Args('input') CreateRestaurantInput:CreateRestaurantInput):Promise<CreateRestaurantOutput>{  
        return this.restaurantService.createRestaurant(authUser,CreateRestaurantInput);
    
    
    }//resolver에서 createRestaurant를 호출하면 createRestaurantDto를 받음 

    @Mutation(returns=>EditRestaurantOutput)
    @Role(["Owner"])
    editRestaurant(
        @AuthUser() owner:User,
        @Args('input') editRestaurantInput:EditRestaurantInput
    ):Promise<EditRestaurantOutput>{
        return this.restaurantService.editRestaurant(owner,editRestaurantInput);
    }

    @Mutation(returns=>DeleteRestaurantOutput)
    @Role(["Owner"])
    deleteRestaurant(
        @AuthUser() owner:User,
        @Args('input') deleteRestaurantInput:DeleteRestaurantInput
    ):Promise<DeleteRestaurantOutput>{
        return this.restaurantService.deleteRestaurant(owner,deleteRestaurantInput);
>>>>>>> 7ad6e6fbfef03bfd07be8c5b0363863f00833150
    }
    


}


