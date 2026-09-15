import { Request, Response } from "express";
import { Blog } from "../../types/blog";
import { inMemoryDB } from "../../../db/in-memory.db";

export const getBlogHandler = (req: Request, res: Response<Blog>) => {
  const blog = inMemoryDB.blogs.find((b) => b.id === +req.params.blogId);

  if (!blog) {
    res.sendStatus(404);
    return;
  }

  res.status(200).send(blog);
};
