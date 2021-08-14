import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateAccountInput } from "./dtos/create-account.dto";
import { LoginInput } from "./dtos/login.dto";
import { User } from "./entity/user.entity";
import * as jwt from 'jsonwebtoken';
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "src/jwt/jwt.service";
import { EditProfileInput } from "./dtos/edit-profile.dto";
import { DeleteAccountInput } from "./dtos/delete-account.dto";

@Injectable()
export class UserService{
    constructor(
        @InjectRepository(User) private readonly users: Repository <User>,
        private readonly jwtService :JwtService,
    ){}

    async createAccount({email,studentId,password,role}:CreateAccountInput): Promise<{ ok: boolean; error?: string }>{
        try{
            const exists=await this.users.findOne({email});
            const exists2 = await this.users.findOne({studentId})
            if(exists || exists2){
                return {ok: false, error: '이미 가입한 이메일이거나 학번입니다.'}; 
            }
        
            await this.users.save(this.users.create({email, studentId, password, role})); //없다면 새로운 계정 create & save
            return {ok: true};
        } catch(e){
            console.log(e);
            return {ok: false, error: "Couldn't create account"};
        }
        
    }

    async login({email,password}:LoginInput):Promise<{ok:boolean; error?:string; token?: string}>{
        //find User with the email
        //check if the pasword is correct
        //make a JWT and give it to the user
        try{
            const user=await this.users.findOne({email});
            if(!user){
                return{
                    ok:false,
                    error:"User not found",
                }
            }
            const passwordCorrect=await user.checkPassword(password); //위에 변수 user이용
            if(!passwordCorrect){
                 return{
                    ok:false,
                    error:"잘못된 비밀번호입니다",
                }
            }
            const token=this.jwtService.sign(user.id);
            return{
                ok:true,
                token,
                 
            }
        }catch(error){
            return{
                ok:false,
                error,
            }
        }
    }

    async findById(id:number):Promise<User>{
        return this.users.findOne({id});
    }

    async editProfile(userId: number, {email, password}: EditProfileInput){
        const user = await this.users.findOne(userId);
        if(email){
            user.email = email
        }
        if(password){
            user.password = password
        }
        return this.users.save(user) //db에 entity 존재 유무 체크 안함
    }// save는 entity 없으면 생성함

    async deleteAccount(userId: number, {email, password, studentId}: DeleteAccountInput){
        const user = await this.users.findOne(userId);
        try{
            if(!user){ //user가 존재하지 않는다면
            return {
                ok:false,
                error: '없는 계정입니다',
            }
            }
            await this.users.delete(userId);
            return{
                ok: true,
            }
        }catch(error){
            return{
                ok: false,
                error,
            };
        }

    }
}  