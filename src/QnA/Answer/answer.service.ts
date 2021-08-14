import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/entity/user.entity";
import { Repository } from "typeorm";
import { CreateAnswerInput, CreateAnswerOutput } from "./dtos/create-answer.dto";
import { DeleteAnswerInput, DeleteAnswerOutPut } from "./dtos/delete-answer.dto";
import { EditAnswerInput, EditAnswerOutput } from "./dtos/edit-answer.dto";
import { Answer } from "./entities/answer.entitiy";


@Injectable()
export class AnswerService{
    constructor(
        @InjectRepository(Answer)
        private readonly answers: Repository<Answer>
    ) {}

    async createAnswer(
        owner: User,
        createAnswerInput: CreateAnswerInput,
    ): Promise<CreateAnswerOutput> {
        try {
            const newAnswer = this.answers.create(createAnswerInput);
            newAnswer.owner = owner;
            await this. answers.save(newAnswer)
            return {
                ok: true
            };
        } catch {
            return {
                ok: false,
                error: "Could not create Answer."
            };
        }
    }

    async editAnswer(
        owner: User,
        editAnswerInput: EditAnswerInput
    ): Promise<EditAnswerOutput> {
        try {
            const answer = await this.answers.findOne(
                this.editAnswer.questionId,
            );
            if (!answer) {
                return {
                    ok: false,
                    error: "Answer not found."
                }
            }
            if (owner.id !== answer.ownerId) {
                return {
                    ok : false,
                    error: "You can't edit an answer you don't own."
                };
            }
            await this.answers.save([{
                id: editAnswerInput.questionId,
                ...editAnswerInput
            }])
            return {
                ok: true
            };
        } catch {
            return {
                ok: false,
                error: "Could not edit an answer."
            }
        }
    }

    async deleteAnswer(
        owner: User,
        {questionId}: DeleteAnswerInput
    ): Promise<DeleteAnswerOutPut> {
        const answer = await this.answers.findOne(questionId);
        try {
            if (!answer) {
                return {
                    ok: false,
                    error: "Answer not found."
                }
            }
            if (owner.id !== answer.ownerId) {
                return {
                    ok: false,
                    error: "You can't delete an answer you don't own."
                };
            }
            await this.answers.delete(questionId)
        } catch {
            return {
                ok: false,
                error: "Couldn not delete an answer."
            };
        }
    }    
}