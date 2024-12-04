import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PostsResolver } from './posts.resolver';
import { PostsService } from './posts.service';
import { join } from 'path';
import { POSTS_PACKAGE_NAME } from './posts';
import { ApolloDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: POSTS_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          url: 'localhost:50051',
          package: POSTS_PACKAGE_NAME,
          protoPath: join(__dirname, 'posts.proto'),
        },
      },
    ]),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema/posts.gql',
    }),
  ],
  providers: [PostsResolver, PostsService],
})
export class PostsModule {}
