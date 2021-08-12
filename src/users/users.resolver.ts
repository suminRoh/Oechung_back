
import { UseGuards } from "@nestjs/common";
import { Resolver, Query, Mutation, Args, Context} from "@nestjs/graphql";
import { AuthUser } from "src/auth/auth-user.decorator";
import { AuthGuard } from "src/auth/auth.guard";
import { UserProfileInput, UserProfileOutput } from "src/users/dtos/user-profile.dto";
import { CreateAccountInput, CreateAccountOutput } from "./dtos/create-account.dto";
import { DeleteAccountInput, DeleteAccountOutput } from "./dtos/delete-account.dto";
import { EditProfileInput, EditProfileOutput } from "./dtos/edit-profile.dto";
import { LoginInput, LoginOutput} from "./dtos/login.dto";
import { User } from "./entities/user.entity";
import { UsersService } from "./users.service";

@Resolver(of => User)
export class UsersResolver {
    constructor(
        private readonly usersService: UsersService
    ){}

    @Query(returns => Boolean)//graphQL 루트 만들기
    hi(){
        return true;
    }

    @Mutation(returns =>CreateAccountOutput)
    async createAccount(
        @Args("input") createAccountInput: CreateAccountInput,
    ): Promise <CreateAccountOutput>{ //createAccountInput이라는 input type만듦
        try{
            return this.usersService.createAccount(createAccountInput);
        } catch(error) {
            //에러 발생시
            return{
                error,
                ok: false,
            }
        }
    }

    @Mutation(returns => LoginOutput)
    async login(@Args('input') loginInput: LoginInput ): Promise<LoginOutput>{//input Arguments 필요
        try {
            return this.usersService.login(loginInput) //loginInput 저장
        } catch(error){
            return{
                ok: false,
                error,
            };
        }
    }
    @Query(returns => User)
    @UseGuards(AuthGuard)
    me(@AuthUser() authUser: User){
        return authUser;
    }//middleware 구현 //로그인한 사람이 누구인지 반환

    @UseGuards(AuthGuard)
    @Query(returns => UserProfileOutput)
    async userProfile(@Args()userProfileInput: UserProfileInput): Promise<UserProfileOutput>{ //user id가져오기
        try {
            const user = await this.usersService.findById(userProfileInput.userId)
            if (!user){
                throw Error(); //user 찾지 못하면 error로
            }
            return{
                ok:true,
                user,
            };
        }catch(e){
            return{
                error:"User Not Found",
                ok: false,
            }
        };     
    }
    @UseGuards(AuthGuard)
    @Mutation(returns=> EditProfileOutput)
    async editProfile(@AuthUser() authUser: User, @Args('input') editProfileInput: EditProfileInput,
    ): Promise<EditProfileOutput>{
        try{
            await this.usersService.editProfile(authUser.id, editProfileInput);
            return {
                ok:true,
            }
        }catch(error)
        {
            return  {
                ok: false,
                error
            }
        }

    }
    @UseGuards(AuthGuard)
    @Mutation(returns=> DeleteAccountOutput)
    async deleteAccount(
        @AuthUser() authUser: User,
        @Args('input') deleteAccountInput: DeleteAccountInput,
    ): Promise<DeleteAccountOutput>{
        try{
            await this.usersService.deleteAccount(authUser.id, deleteAccountInput);
            return {
                ok: true,
            }
        }catch(error)
        {
            return  {
                ok: false,
                error
                
            }
        }

    }
    
}