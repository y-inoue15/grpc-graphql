import { Query, Resolver, Args, Int } from '@nestjs/graphql';
import { Post } from '../posts/models/post/post';
import { PostsService } from './posts.service';
import { map, Observable } from 'rxjs';

@Resolver(() => Post)
export class PostsResolver {
  constructor(private postService: PostsService) {}

  @Query(() => [Post], { name: 'posts', nullable: true })
  posts(
    @Args('id', { type: () => Int, nullable: true }) id?: number,
  ): Observable<Post[]> {
    if (id !== undefined) {
      return this.postService
        .findOne(id.toString())
        .pipe(map((post) => (post ? [post] : [])));
    } else {
      return this.postService.findAll().pipe(map((postList) => postList.posts));
    }
  }
}
