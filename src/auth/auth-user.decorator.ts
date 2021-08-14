<<<<<<< HEAD
import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";


export const AuthUser = createParamDecorator(
    (data:unknown, context: ExecutionContext) => {
        const gqlContext = GqlExecutionContext.create(context).getContext();
        const user = gqlContext['user'];
        return user;
    }
)
=======
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const AuthUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const gqlContext = GqlExecutionContext.create(context).getContext();
    const user = gqlContext['user'];
    return user;
  },
);
>>>>>>> 7ad6e6fbfef03bfd07be8c5b0363863f00833150
