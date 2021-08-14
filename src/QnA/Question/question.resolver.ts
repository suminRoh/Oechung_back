import { SetMetadata } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { AuthUser } from "src/auth/auth-user.decorator";
import { Role } from "src/auth/role.decorator";
import { User, UserRole } from "src/users/entity/user.entity";
import { CreateQuestionInput, CreateQuestionOutput } from "./dtos/create-question.dto";
import { DeleteQuestionInput, DeleteQuestionOutput } from "./dtos/delete-question.dto";
import { EditQuestionInput, EditQuestionOutput } from "./dtos/edit-question.dto";
import { Question } from "./entities/question.entity";
import { QuestionService } from "./Question.Service";


@Resolver(of=>Question)
export class QuestionResolver {
    constructor(private readonly questionService: QuestionService) {}

    @Mutation(returns => CreateQuestionOutput)
    @SetMetadata("role", UserRole.Client)
    @Role(['Client'])
    async createQuestion(
        authUser: User,
        @Args('input') createQuestionInput: CreateQuestionInput,
    ): Promise<CreateQuestionOutput> {
        return this.questionService.createQuestion(
            authUser,
            createQuestionInput,
        );
    }

    @Mutation(returns => EditQuestionOutput)
    @Role(['Client'])
    editQuestion(
        @AuthUser() owner: User,
        @Args('input') editQuestionInput: EditQuestionInput
    ): Promise<EditQuestionOutput> {
        return this.questionService.editQuestion(owner, editQuestionInput);
    }

    @Mutation(returns => DeleteQuestionOutput)
    @Role(['Client'])
    deleteQuestion(
        @AuthUser() owner: User,
        @Args('input') deleteQuestionInput: DeleteQuestionInput,
    ): Promise<DeleteQuestionOutput> {
        return this.questionService.deleteQuestion(owner, deleteQuestionInput);
    }
}