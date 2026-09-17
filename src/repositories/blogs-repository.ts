import { BlogInputDto } from "../blogs/dto/blog.input.dto";
import { Blog } from "../blogs/types/blog";
import { inMemoryDB } from "../db/in-memory.db";

export const blogsRepository = {
  getAllBlogs() {
    return inMemoryDB.blogs;
  },
  getBlogById(id: string) {
    return inMemoryDB.blogs.find((b) => b.id === id);
  },
  createBlog(blog: BlogInputDto) {
    const lastBlog = inMemoryDB.blogs[inMemoryDB.blogs.length - 1];
    const createdBlog: Blog = {
      id: lastBlog ? (+lastBlog.id + 1).toString() : "1",
      ...blog,
    };

    inMemoryDB.blogs.push(createdBlog);
    return createdBlog;
  },
  updateBlog(updateData: BlogInputDto, blogId: string): boolean {
    const index = inMemoryDB.blogs.findIndex((d) => d.id === blogId);

    if (index === -1) {
      return false;
    }

    // Обновляем поля, сохраняя служебные id и createdAt.
    inMemoryDB.blogs[index] = { ...inMemoryDB.blogs[index], ...updateData };
    return true;
  },

  deleteBlog(blogId: string): boolean {
    const index = inMemoryDB.blogs.findIndex((d) => d.id === blogId);

    if (index === -1) {
      return false;
    }

    inMemoryDB.blogs.splice(index, 1);
    return true;
  },
};
