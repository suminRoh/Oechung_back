import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { Role } from 'src/auth/role.decorator';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from './dtos/create-account.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';
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
     
      return { ok, error, token };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  @Role(["Any"])
  @UseGuards(AuthGuard)
  me(@AuthUser() authUser:User) {
    return authUser;
  }
 

//metadata를 설정한다는 뜻은 우리가 authentication을 고려한다는 것 
//어떤 metadata도 설정하지 않는다면 role을 고려하지 않는다는 것 ->모든 사람이 사용 가능 
}
