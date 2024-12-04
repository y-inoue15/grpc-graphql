import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import {
  POSTS_SERVICE_NAME,
  POSTS_PACKAGE_NAME,
  PostsServiceClient,
} from './posts';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class PostsService implements OnModuleInit {
  private postsService: PostsServiceClient;

  constructor(@Inject(POSTS_PACKAGE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.postsService =
      this.client.getService<PostsServiceClient>(POSTS_SERVICE_NAME);
  }

  findOne(id: string) {
    return this.postsService.findOne({ id: id });
  }

  findAll() {
    return this.postsService.findAll({});
  }
}
