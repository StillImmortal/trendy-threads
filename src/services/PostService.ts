import { Post } from "@/models/domain"

interface PostServiceInterface {
  getAllPosts: () => Post[];
  getPostById: (id: string) => Post;
  addPost: (product: Post) => void;
  updatePostById: (id: string, product: Post) => void;
}

class PostService implements PostServiceInterface {
  getAllPosts(): Post[] {
    return []
  }

  getPostById(id: string): Post {
    return {} as Post
  }

  addPost(product: Post): void {

  }

  updatePostById(id: string, product: Post): void {

  }
}

export default new PostService()