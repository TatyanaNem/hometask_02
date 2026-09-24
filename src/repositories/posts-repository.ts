import { Post } from "../posts/types/post";
import { ObjectId, WithId } from "mongodb";
import { postCollection } from "../db/collections";

export const postsRepository = {
  async getAllPosts(): Promise<WithId<Post>[]> {
    return postCollection.find().toArray();
  },
  async getPostById(id: string): Promise<WithId<Post> | null> {
    return postCollection.findOne({ _id: new ObjectId(id) });
  },
  async createPost(post: Post): Promise<WithId<Post>> {
    const createdPost = await postCollection.insertOne(post);
    return { ...post, _id: new ObjectId(createdPost.insertedId) };
  },
  async updatePost(updateData: Post, postId: string): Promise<boolean> {
    const result = await postCollection.updateOne(
      {
        _id: new ObjectId(postId),
      },
      { $set: updateData },
    );
    return result.matchedCount > 0;
  },

  async deletePost(postId: string): Promise<boolean> {
    const result = await postCollection.deleteOne({
      _id: new ObjectId(postId),
    });
    return result.deletedCount > 0;
  },
};
