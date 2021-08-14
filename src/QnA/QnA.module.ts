import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerResolver } from './Answer/answer.resolver';
import { AnswerService } from './Answer/answer.service';
import { Answer } from './Answer/entities/answer.entitiy';
import { Question } from './Question/entities/question.entity';
import { QuestionResolver } from './Question/Question.resolver';
import { QuestionService } from './Question/Question.Service';

@Module({
    imports: [TypeOrmModule.forFeature([Question, Answer])],
    providers: [QuestionResolver, QuestionService, AnswerResolver, AnswerService],
})
export class QnAModule {}
