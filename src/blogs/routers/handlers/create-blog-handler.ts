import { Response, Request } from "express";
import { inMemoryDB } from "../../../db/in-memory.db";
import { Blog } from "../../types/blog";

export const createBlogHandler = (req: Request, res: Response) => {
  const lastBlog = inMemoryDB.blogs[inMemoryDB.blogs.length - 1];
  const createdBlog: Blog = {
    id: lastBlog ? lastBlog.id + 1 : 1,
    ...req.body,
  };

  inMemoryDB.blogs.push(createdBlog);

  res.status(201).send(createdBlog);
};
