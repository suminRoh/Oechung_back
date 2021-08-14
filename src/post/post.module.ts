import { Module, Post } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { O_Post } from './entities/O_post.entity';
import { PostResolver } from './post.resolvers';
import { PostService } from './post.service';
import { O_categoryRepository } from './repositories/O_category.repository';


@Module({
  imports:[TypeOrmModule.forFeature([
    O_Post,O_categoryRepository
  ])],
  providers: [PostService,PostResolver]
})
export class PostModule {}
