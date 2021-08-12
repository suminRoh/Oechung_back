import { Injectable, Query, RequestMethod } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateAccountInput } from "./dtos/create-account.dto";
import { LoginInput } from "./dtos/login.dto";
import { User } from "./entities/user.entity";
import * as jwt from 'jsonwebtoken';
import { ConfigService } from "@nestjs/config";
import { JwtService } from "src/jwt/jwt.service";
import { EditProfileInput } from "./dtos/edit-profile.dto";
import { DeleteAccountInput } from "./dtos/delete-account.dto";
import { userInfo } from "os";

@Injectable()
export class UsersService{
    constructor(
        @InjectRepository(User) private readonly users: Repository <User>,//User entity의 InjectRepository 불러오기 & type이 repository이고 repository type은 user enitity
        private readonly jwtService: JwtService, //nestjs는 클래스 타입만 보고 import 알아서 찾아줌
        ){}

    async createAccount({
        email,
        studentId,
        password, 
        role,
    }: CreateAccountInput): Promise <{ok: boolean, error? :string }>{
        //check new user(that email does not exist)
        try {
            const exists = await this.users.findOne({email}) //findOne = 주어진 condition(환경)과 일치하는 첫 번째 entity 찾기
            const exists2 = await this.users.findOne({studentId})
            if(exists || exists2){
                //make error
                return {ok: false, error: '이미 가입한 이메일이거나 학번입니다.'}; //boolean =false, error ="there~"
            }
            await this.users.save(this.users.create({email, studentId, password, role})); //없다면 새로운 계정 create & save
            return {ok: true};
        } catch(e){
            console.log(e);
            return {ok: false, error: "Couldn't create account"};
        }
        // create user & hash the password
        
    }

    async login({
        email, 
        password
    }: LoginInput): Promise<{ok: boolean; error?:string, token?: string}> {
        //make a JWT and give it to the user
        try{
            // find the user with the email
            const user = await this.users.findOne({ email });
            if(!user){ //user가 존재하지 않는다면
                return {
                    ok:false,
                    error: 'User not found',
                }
            }
            //check if the password is correct
            //비밀번호를 hash 한후 데이터베이스에 있는 hash된 비번과 같은지 확인
            const passwordCorrect = await user.checkPassword(password); //여기의 user와 위의 const user와는 다름.. 전자는 entity 
            if (!passwordCorrect){
                return{
                    ok:false,
                    error:"잘못된 비밀번호입니다",
                };
            }
            const token = this.jwtService.sign(user.id);//이 module을 내 백엔드만으로 특정함
            return{
                ok:true,
                token,
            }
        }catch(error){
            return{
                ok: false,
                error,
            };
        }
        
    }
    async findById(id:number): Promise<User>{
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