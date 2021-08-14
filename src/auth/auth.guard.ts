<<<<<<< HEAD
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
import {AllowedRoles} from 'src/auth/role.decorator';
import { User } from "src/users/entity/user.entity";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}
    canActivate(context: ExecutionContext) {
        const roles = this.reflector.get<AllowedRoles>('roles', context.getHandler());
        if (!roles) {
            return true;
        }
        const gqlContext = GqlExecutionContext.create(context).getContext();
        const user:User = gqlContext['user'];
        if (!user) {
            return false;
        } 
        if (roles.includes("Any")) {
            return true;
        }
        return roles.includes(user.role);
    }
}
=======
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from 'src/users/entity/user.entity';
import { AllowedRoles } from './role.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector:Reflector){}
  canActivate(context: ExecutionContext) {    
    const roles=this.reflector.get<AllowedRoles>(
      'roles',
      context.getHandler(),
      );
    if(!roles){//roles가 없으면 public이며 return true
      return true;
    }
    const gqlContext = GqlExecutionContext.create(context).getContext();
    //gqlContext: context를 graphqlcontext로 변환
    const user:User= gqlContext['user'];
    if (!user) {
      return false;
    } 
    if(roles.includes("Any")){//user가 있으며 resolver는 어떤 user든 진행할 수 있도록 허용 
      return true; 
    }
    return roles.includes(user.role);
  }
}//로그인 안돼있으면 user를 만들 수 없음     

//guard : executation context를 가져올 뿐만 아니라 metadata도 가져옴 
>>>>>>> 7ad6e6fbfef03bfd07be8c5b0363863f00833150
