import { Request, Response } from "express";
import { Blog } from "../../types/blog";
import { blogsRepository } from "../../../repositories/blogs-repository";

export const getBlogHandler = (
  req: Request<{ blogId: string }>,
  res: Response<Blog>,
) => {
  const blog = blogsRepository.getBlogById(req.params.blogId);

  if (!blog) {
    res.sendStatus(404);
    return;
  }

  res.status(200).send(blog);
};
