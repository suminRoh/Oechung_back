import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsString, Length } from "class-validator";
import { CoreEntity } from "src/common/entities/core.entity";
import { User } from "src/users/entity/user.entity";
import { Column, Entity, ManyToOne, OneToOne, RelationId } from "typeorm";
import { Category } from "./category.entity";

@InputType('RestaurantInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Restaurant extends CoreEntity { //Question

    @Field(is=>String)
    @Column()
    @IsString()
    @Length(5)
    name: string; //제목

    @Field(type=>String)
    @Column()
    @IsString()
    @Length(100)
    body :string; //본문

    @Field(type => Category, { nullable: true })
    @OneToOne(
        type => Category,
        category => category.restaurants,
        { nullable: true , onDelete: 'SET NULL'}
    )
    category: Category;

    @Field(type => User) //작성자
    @ManyToOne(
        type => User,
        user => user.restaurants,
        {onDelete: 'CASCADE'},
    )
    owner: User;

    @RelationId((restaurant: Restaurant) => restaurant.owner)
    ownerId: number;
}
//Q와 A가 one-to-one 관계