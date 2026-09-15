import { Request, Response } from "express";
import { blogsRepository } from "../../../repositories/blogs-repository";
import { BlogInputDto } from "../../dto/blog.input.dto";

export const updateBlogHandler = (
  req: Request<{ blogId: string }, {}, BlogInputDto>,
  res: Response,
) => {
  const blog = blogsRepository.getBlogById(req.params.blogId);
  if (!blog) {
    res.sendStatus(404);
    return;
  }

  blogsRepository.updateBlog(req.body, req.params.blogId);
  res.sendStatus(204);
};
