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
