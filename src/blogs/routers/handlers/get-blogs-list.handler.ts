import { Request, Response } from "express";
import { Blog } from "../../types/blog";
import { blogsRepository } from "../../../repositories/blogs-repository";

export const getBlogsListHandler = (req: Request, res: Response<Blog[]>) => {
  res.status(200).send(blogsRepository.getAllBlogs());
};
