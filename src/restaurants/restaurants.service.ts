import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/entity/user.entity";
import { Repository } from "typeorm";
import { CreateRestaurantInput, CreateRestaurantOutput } from "./dtos/create-restaurant.dto";
import { DeleteRestaurantInput, DeleteRestaurantOutPut } from "./dtos/delete-restaurant.dto";
import { EditRestaurantInput, EditRestaurantOutput } from "./dtos/edit-restaurant.dto";
import { Category } from "./entities/category.entity";
import { Restaurant } from "./entities/restaurant.entity";
import {CategoryRepository} from "./repositories/category.repository";

@Injectable()
export class RestaurantService{
    constructor(
        @InjectRepository(Restaurant)
        private readonly restaurants: Repository<Restaurant>,
        @InjectRepository(Category)
        private readonly categories: CategoryRepository
        ){} 

    async createRestaurant(
        owner: User,
        createRestaurantInput: CreateRestaurantInput,
    ): Promise<CreateRestaurantOutput> {
        try {
            const newRestaurant = this.restaurants.create(createRestaurantInput);
            newRestaurant.owner = owner;
            const categoryName = createRestaurantInput.categoryName.trim()
            let category = await this.categories.find({ name: categoryName });
            if (!category) {
                category = await this.categories.save(
                    this.categories.create({ name: categoryName }),
                );
            }
            newRestaurant.category = category;
            await this.restaurants.save(newRestaurant)
            return {
                ok : true,
            };
        } catch {
            return {
                ok: false,
                error: "Could not create Question",
            };
        }
    }

    async editRestaurant(owner:User, editRestaurantInput:EditRestaurantInput): Promise<EditRestaurantOutput> {
        try {
            const restaurant = await this.restaurants.findOne(
                editRestaurantInput.restaurantId,
            );
            if (!restaurant) {
                return {
                    ok: false,
                    error: 'Question not found',
                }
            }
            if(owner.id !== restaurant.ownerId) {
                return {
                    ok: false,
                    error: "You can't edit a question you don't own",
                };
            }
            await this.restaurants.save([{
                id: editRestaurantInput.restaurantId,
                ...editRestaurantInput,
            }])
            return {
                ok: true
            };
        } catch {
            return {
                ok: false,
                error: "Could not edit question",
            }
        }
    }

    async deleteRestaurant(owner: User, {restaurantId}: DeleteRestaurantInput): Promise<DeleteRestaurantOutPut> {
        const restaurant = await this.restaurants.findOne(
            restaurantId,
        );
        try {
            if (!restaurant) {
                return {
                    ok: false,
                    error: 'Question not found',
                }
            }
            if(owner.id !== restaurant.ownerId) {
                return {
                    ok: false,
                    error: "You can't delete a question you don't own",
                };
            }
            await this.restaurants.delete(restaurantId)
        } catch {
            return {
                ok: false,
                error: "Could not delete a question"
            };
        }
    }
}