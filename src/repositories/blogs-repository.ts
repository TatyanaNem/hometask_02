import { ObjectId, WithId } from "mongodb";
import { BlogInputDto } from "../blogs/dto/blog.input.dto";
import { Blog } from "../blogs/types/blog";
import { blogCollection } from "../db/collections";

export const blogsRepository = {
  async getAllBlogs(): Promise<WithId<Blog>[]> {
    return blogCollection.find().toArray();
  },
  async getBlogById(id: string): Promise<WithId<Blog> | null> {
    return blogCollection.findOne({ _id: new ObjectId(id) });
  },
  async createBlog(blog: BlogInputDto): Promise<WithId<Blog>> {
    const createdBlog = await blogCollection.insertOne(blog);
    return {
      _id: createdBlog.insertedId,
      ...blog,
    };
  },
  async updateBlog(updateData: BlogInputDto, blogId: string): Promise<boolean> {
    const result = await blogCollection.updateOne(
      { _id: new ObjectId(blogId) },
      { $set: updateData },
    );

    return result.modifiedCount > 0;
  },

  async deleteBlog(blogId: string): Promise<boolean> {
    const result = await blogCollection.deleteOne({
      _id: new ObjectId(blogId),
    });
    return result.deletedCount > 0;
  },
};
