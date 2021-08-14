import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { UserService } from "src/users/users.service";
import { JwtService } from "./jwt.service";

//implements : 이 class가 implements처럼 행동 
@Injectable()
export class JwtMiddleware implements NestMiddleware{
    constructor(private readonly jwtService:JwtService,
        private readonly userService:UserService){}
    async use(req:Request,res:Response,next:NextFunction){
        if("x-jwt" in req.headers){
            const token=req.headers['x-jwt'];
            try{
                const decoded=this.jwtService.verify(token.toString());
                if(typeof decoded==="object"&& decoded.hasOwnProperty('id')){
                    const user=await this.userService.findById(decoded["id"]);
                    req['user']=user;
                }
            }catch(e){}
        }
        next(); //request,response를 호출한 다음 잊지말고 next를 호출해야함 
    }
}//class middleware를 사용하려면 app.module에서 해야함