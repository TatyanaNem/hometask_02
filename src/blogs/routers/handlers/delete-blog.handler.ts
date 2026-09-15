import { Response, Request } from "express";
import { blogsRepository } from "../../../repositories/blogs-repository";

export const deleteBlogHandler = (
  req: Request<{ blogId: string }>,
  res: Response,
) => {
  const blog = blogsRepository.getBlogById(req.params.blogId);
  if (!blog) {
    res.sendStatus(404);
    return;
  }

  blogsRepository.deleteBlog(req.params.blogId);
  res.sendStatus(204);
};
