<<<<<<< HEAD
import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./auth.guard";

@Module({
    providers: [{
        provide: APP_GUARD,
        useClass: AuthGuard,
    }]

})
export class AuthModule {}
=======
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core'; //이미 nestjs에서 제공된 constant
import { AuthGuard } from './auth.guard';

@Module({
    providers:[{
        provide:APP_GUARD,
        useClass:AuthGuard
    }]
})
export class AuthModule {}
>>>>>>> 7ad6e6fbfef03bfd07be8c5b0363863f00833150
