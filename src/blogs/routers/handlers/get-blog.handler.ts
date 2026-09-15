import { Request, Response } from "express";
import { Blog } from "../../types/blog";
import { blogsRepository } from "../../../repositories/blogs-repository";
import { HttpStatus } from "../../../core/types/http-statuses";

export const getBlogHandler = (
  req: Request<{ blogId: string }>,
  res: Response<Blog>,
) => {
  const blog = blogsRepository.getBlogById(req.params.blogId);

  if (!blog) {
    res.sendStatus(HttpStatus.NotFound);
    return;
  }

  res.status(HttpStatus.Ok).send(blog);
};
