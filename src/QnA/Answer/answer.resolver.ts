import { SetMetadata } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { AuthUser } from "src/auth/auth-user.decorator";
import { Role } from "src/auth/role.decorator";
import { User, UserRole } from "src/users/entity/user.entity";
import { AnswerService } from "./answer.service";
import { CreateAnswerInput, CreateAnswerOutput } from "./dtos/create-answer.dto";
import { DeleteAnswerInput, DeleteAnswerOutPut } from "./dtos/delete-answer.dto";
import { EditAnswerInput, EditAnswerOutput } from "./dtos/edit-answer.dto";
import { Answer } from "./entities/answer.entitiy";


@Resolver(of => Answer)
export class AnswerResolver {
    constructor(private readonly answerService: AnswerService) {}

    @Mutation(returns => CreateAnswerOutput)
    @SetMetadata("role", UserRole.Owner)
    @Role(['Owner'])
    async createAnswer(
        authUser: User,
        @Args('input') createAnswerInput: CreateAnswerInput,
    ): Promise<CreateAnswerOutput> {
        return this.answerService.createAnswer(
            authUser,
            createAnswerInput
        );
    }

    @Mutation(returns => EditAnswerOutput)
    @Role(['Owner'])
    editQuestion(
        @AuthUser() owner: User,
        @Args('input') editAnswerInput: EditAnswerInput
    ): Promise<EditAnswerOutput> {
        return this.answerService.editAnswer(owner, editAnswerInput);
    }

    @Mutation(returns => DeleteAnswerOutPut)
    @Role(['Owner'])
    deleteQuestion(
        @AuthUser() owner: User,
        @Args('input') deleteAnswerInput: DeleteAnswerInput,
    ): Promise<DeleteAnswerOutPut> {
        return this.answerService.deleteAnswer(owner, deleteAnswerInput);
    }
}