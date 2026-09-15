import { Response, Request } from "express";
import { blogsRepository } from "../../../repositories/blogs-repository";
import { HttpStatus } from "../../../core/types/http-statuses";

export const deleteBlogHandler = (
  req: Request<{ blogId: string }>,
  res: Response,
) => {
  const blog = blogsRepository.getBlogById(req.params.blogId);
  if (!blog) {
    res.sendStatus(HttpStatus.NotFound);
    return;
  }

  blogsRepository.deleteBlog(req.params.blogId);
  res.sendStatus(HttpStatus.NoContent);
};
