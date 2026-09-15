import { BlogInputDto } from "../blogs/dto/blog.input.dto";
import { Blog } from "../blogs/types/blog";
import { inMemoryDB } from "../db/in-memory.db";

export const blogsRepository = {
  getAllBlogs() {
    return inMemoryDB.blogs;
  },
  getBlogById(id: string) {
    return inMemoryDB.blogs.find((b) => b.id === parseInt(id));
  },
  createBlog(blog: BlogInputDto) {
    const lastBlog = inMemoryDB.blogs[inMemoryDB.blogs.length - 1];
    const createdBlog: Blog = {
      id: lastBlog ? lastBlog.id + 1 : 1,
      ...blog,
    };

    inMemoryDB.blogs.push(createdBlog);
    return createdBlog;
  },
  updateBlog(updateData: BlogInputDto, blogId: string) {
    inMemoryDB.blogs = inMemoryDB.blogs.map((item: Blog) => {
      if (item.id === parseInt(blogId)) {
        return {
          ...item,
          ...updateData,
        };
      }
      return item;
    });
  },

  deleteBlog(blogId: string) {
    inMemoryDB.blogs = inMemoryDB.blogs.filter(
      (b) => b.id !== parseInt(blogId),
    );
  },
};
