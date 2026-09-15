import { Request, Response } from "express";
import { inMemoryDB } from "../../../db/in-memory.db";
import { Blog } from "../../types/blog";

export const updateBlogHandler = (req: Request, res: Response) => {
  inMemoryDB.blogs = inMemoryDB.blogs.map((blog: Blog) => {
    if (blog.id === +req.params.blogId) {
      return {
        ...blog,
        ...req.body,
      };
    }
    return blog;
  });

  res.sendStatus(204);
};
