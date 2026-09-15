import { Request, Response } from "express";
import { Blog } from "../../types/blog";
import { blogsRepository } from "../../../repositories/blogs-repository";
import { HttpStatus } from "../../../core/types/http-statuses";

export const getBlogsListHandler = (req: Request, res: Response<Blog[]>) => {
  res.status(HttpStatus.Ok).send(blogsRepository.getAllBlogs());
};
