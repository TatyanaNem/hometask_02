import { PostInputDto } from "../posts/dto/post.input.dto";
import { Post } from "../posts/types/post";
import { inMemoryDB } from "../db/in-memory.db";
import { blogsRepository } from "./blogs-repository";

export const postsRepository = {
  getAllPosts() {
    return inMemoryDB.posts;
  },
  getPostById(id: string) {
    return inMemoryDB.posts.find((p) => p.id === id);
  },
  createPost(post: PostInputDto) {
    const blog = blogsRepository.getBlogById(post.blogId);
    const lastPost = inMemoryDB.posts[inMemoryDB.posts.length - 1];
    const createdPost: Post = {
      id: lastPost ? (+lastPost.id + 1).toString() : "1",
      title: post.title,
      shortDescription: post.shortDescription,
      content: post.content,
      blogId: post.blogId,
      blogName: blog!.name,
    };

    inMemoryDB.posts.push(createdPost);
    return createdPost;
  },
  updatePost(updateData: PostInputDto, postId: string): boolean {
    const index = inMemoryDB.posts.findIndex((p) => p.id === postId);

    if (index === -1) {
      return false;
    }

    const blog = blogsRepository.getBlogById(updateData.blogId);

    inMemoryDB.posts[index] = {
      ...inMemoryDB.posts[index],
      title: updateData.title,
      shortDescription: updateData.shortDescription,
      content: updateData.content,
      blogId: updateData.blogId,
      blogName: blog!.name,
    };
    return true;
  },

  deletePost(postId: string): boolean {
    const index = inMemoryDB.posts.findIndex((p) => p.id === postId);

    if (index === -1) {
      return false;
    }

    inMemoryDB.posts.splice(index, 1);
    return true;
  },
};
