import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { Restaurant } from './restaurants/entities/restaurant.entity';
import { UsersModule } from './users/users.module';
import { CommonModule } from './common/common.module';
import { User } from './users/entity/user.entity';
import { JwtModule } from './jwt/jwt.module';
import { Verification } from './users/entity/verification.entity';
import { Category } from './restaurants/entities/category.entity';
import { AuthModule } from './auth/auth.module';
import { JwtMiddleware } from './jwt/jwt.middleware';
import { PostModule } from './post/post.module';
import { O_Post } from './post/entities/O_post.entity';
import { O_category } from './post/entities/O_category.entity';
import { QnAModule } from './QnA/QnA.module';
import { Question } from './QnA/Question/entities/question.entity';
import { Answer } from './QnA/Answer/entities/answer.entitiy';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.test',
      ignoreEnvFile: process.env.NODE_ENV === 'prod',
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('dev', 'prod')
          .required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        PRIVATE_KEY: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRoot({
      type:'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password:"sumsumin06",
      database: process.env.DB_NAME,
      synchronize: process.env.NODE_ENV !== 'prod', //entity??? ????????? ????????? migration(graphql?????? ???????????? ???????????? ???????????? ??????????????? DB?????? ?????? ?????? )
      logging:process.env.NODE_ENV !== 'prod', //DB??? ???????????? ?????? ???????????? ?????? ????????????
      entities:[User,Verification,Restaurant,Category,O_Post,O_category, Question, Answer] //entity??? ???????????? ?????? DB??? ???     
    }),
    GraphQLModule.forRoot({
    autoSchemaFile:true,
    context:({req})=>({user:req['user']})
    }),
    JwtModule.forRoot({
      privateKey:process.env.PRIVATE_KEY,
    }),
    UsersModule,
    AuthModule,
    RestaurantsModule,
    AuthModule,
    PostModule,
    QnAModule,
],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule{
  configure(consumer:MiddlewareConsumer){
    consumer.apply(JwtMiddleware).forRoutes({
      path:"/graphql",
      method:RequestMethod.POST, 
    });
  }
}
//JwtMiddleware??? path??? /graphql?????? method??? RequestMethod??? ???????????? ??????
