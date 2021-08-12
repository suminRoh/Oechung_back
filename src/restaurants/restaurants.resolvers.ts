import { SetMetadata } from '@nestjs/common';
import {Args, Mutation,Resolver} from '@nestjs/graphql';
import { User, UserRole } from 'src/users/entity/user.entity';
import { CreateRestaurantInput, CreateRestaurantOutput} from './dtos/create-restaurant.dto';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantService } from './restaurants.service';
import { Role } from 'src/auth/role.decorator';
import { EditRestaurantInput, EditRestaurantOutput } from './dtos/edit-restaurant.dto';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { DeleteRestaurantInput, DeleteRestaurantOutPut } from './dtos/delete-restaurant.dto';

@Resolver(of=>Restaurant)
export class RestaurantsResolver{
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
    }
}


