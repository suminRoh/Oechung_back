import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { Role } from 'src/auth/role.decorator';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from './dtos/create-account.dto';
import { DeleteAccountInput, DeleteAccountOutput } from './dtos/delete-account.dto';
import { EditProfileInput, EditProfileOutput } from './dtos/edit-profile.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { UserProfileInput, UserProfileOutput } from './dtos/user-profile.dto';
import { User } from './entity/user.entity';
import { UserService } from './users.service';
@Resolver(of => User)
export class UserResolver {
  constructor(private readonly usersService: UserService) {}
  @Query(returns => Boolean)
  hi() {
    return true;
  }   
  @Mutation(returns => CreateAccountOutput)
  async createAccount(
    @Args('input') createAccountInput: CreateAccountInput,
  ): Promise<CreateAccountOutput> {
    try {
      const { ok, error } = await this.usersService.createAccount(
        createAccountInput,
      );
      return {
        ok,
        error,
      };
    } catch (error) {
      return {
        error,
        ok: false,
      };
    }
  }
  @Mutation(returns => LoginOutput)
  async login(@Args('input') loginInput: LoginInput): Promise<LoginOutput> {
    try {
      const { ok, error, token } = await this.usersService.login(loginInput);
      return{ok,error,token};
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  @Query(returns=>User)
  @UseGuards(AuthGuard)
  me(@AuthUser() authUser:User) {
    return authUser;
  }
 
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
      }catch(error){ 
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
//metadata를 설정한다는 뜻은 우리가 authentication을 고려한다는 것 
//어떤 metadata도 설정하지 않는다면 role을 고려하지 않는다는 것 ->모든 사람이 사용 가능 
}
