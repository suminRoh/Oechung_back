import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Restaurant } from './entities/restaurant.entity';
import { CategoryRepository } from './repositories/category.repository';
import { RestaurantsResolver } from './restaurants.resolvers';
import { RestaurantService } from './restaurants.service';

@Module({
<<<<<<< HEAD
    imports:[TypeOrmModule.forFeature([Restaurant, CategoryRepository])],
=======
    imports:[TypeOrmModule.forFeature([Restaurant,CategoryRepository])],
>>>>>>> 7ad6e6fbfef03bfd07be8c5b0363863f00833150
    providers:[RestaurantsResolver,RestaurantService],
})
export class RestaurantsModule {}
