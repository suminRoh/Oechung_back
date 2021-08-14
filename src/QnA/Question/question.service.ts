import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/entity/user.entity";
import { Repository } from "typeorm";
import { CreateQuestionInput, CreateQuestionOutput } from "./dtos/create-question.dto";
import { DeleteQuestionInput, DeleteQuestionOutput } from "./dtos/delete-question.dto";
import { EditQuestionInput, EditQuestionOutput } from "./dtos/edit-question.dto";
import { Question } from "./entities/question.entity";

@Injectable()
export class QuestionService{
    constructor(
        @InjectRepository(Question)
        private readonly questions: Repository<Question>
    ) {}

    async createQuestion(
        owner: User,
        createQuestionInput: CreateQuestionInput,
    ): Promise<CreateQuestionOutput> {
        try {
            const newQuestion = this.questions.create(createQuestionInput);
            newQuestion.owner = owner;
            await this.questions.save(newQuestion)
            return {
                ok: true,
            };
        } catch {
            return {
                ok: false,
                error: "Could not create Question.",
            };
        }
    }

    async editQuestion(
        owner: User, 
        editQuestionInput: EditQuestionInput
    ): Promise<EditQuestionOutput> {
        try {
            const question = await this.questions.findOne(
                editQuestionInput.questionId,
            );
            if (!question) {
                return {
                    ok: false,
                    error: "Question not found.",
                }
            }
            if (owner.id !== question.ownerId) {
                return {
                    ok: false,
                    error: "You can't edit a question you don't own."
                };
            }
            await this.questions.save([{
                id: editQuestionInput.questionId,
                ...editQuestionInput,
            }])
            return {
                ok: true
            };
        } catch {
            return {
                ok: false,
                error: "Could not edit question."
            }
        }
    }

    async deleteQuestion(
        owner: User, 
        {questionId}: DeleteQuestionInput
    ): Promise<DeleteQuestionOutput> {
        const question = await this.questions.findOne(questionId);
        try {
            if (!question) {
                return {
                    ok: false,
                    error: "Question not found."
                }
            }
            if (owner.id !== question.ownerId) {
                return {
                    ok: false,
                    error: "You can't delete a question you don't own."
                };
            }
            await this.questions.delete(questionId)
        } catch {
            return {
                ok: false,
                error: "Could not delete a question."
            };
        }
    }
}