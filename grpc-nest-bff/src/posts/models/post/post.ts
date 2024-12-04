import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Post {
  @Field(() => String)
  id: string;

  @Field(() => String)
  title: string;

  @Field(() => Int)
  views: number;
}
