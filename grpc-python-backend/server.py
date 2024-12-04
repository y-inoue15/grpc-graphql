from concurrent import futures
import grpc
import posts_pb2
import posts_pb2_grpc

POSTS = [
    {"id": "1", "title": "a title", "views": 100},
    {"id": "2", "title": "another title", "views": 200},
    {"id": "3", "title": "third title", "views": 300},
]

class PostsService(posts_pb2_grpc.PostsServiceServicer):
    def FindAll(self, request, context):
        return posts_pb2.PostList(posts=[
            posts_pb2.Post(id=post["id"], title=post["title"], views=post["views"])
            for post in POSTS
        ])

    def FindOne(self, request, context):
        for post in POSTS:
            if post["id"] == request.id:
                return posts_pb2.Post(id=post["id"], title=post["title"], views=post["views"])
        context.set_code(grpc.StatusCode.NOT_FOUND)
        context.set_details("Post not found")
        return posts_pb2.Post()

def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    posts_pb2_grpc.add_PostsServiceServicer_to_server(PostsService(), server)
    server.add_insecure_port("[::]:50051")
    print("gRPC server is running on port 50051")
    server.start()
    server.wait_for_termination()

if __name__ == "__main__":
    serve()