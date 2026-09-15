import { Request, Response } from "express";
import { inMemoryDB } from "../../../db/in-memory.db";
import { Blog } from "../../types/blog";

export const getBlogsListHandler = (req: Request, res: Response<Blog[]>) => {
  res.status(200).send(inMemoryDB.blogs);
};
