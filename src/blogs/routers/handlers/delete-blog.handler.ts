import { Response, Request } from "express";
import { blogsRepository } from "../../../repositories/blogs-repository";
import { HttpStatus } from "../../../core/types/http-statuses";
import { createErrorMessages } from "../../../middlewares/input-validation-result.middleware";

export const deleteBlogHandler = (
  req: Request<{ blogId: string }>,
  res: Response,
) => {
  const blog = blogsRepository.getBlogById(req.params.blogId);
  if (!blog) {
    res
      .status(HttpStatus.NotFound)
      .send(createErrorMessages([{ field: "id", message: "Blog not found" }]));
    return;
  }

  blogsRepository.deleteBlog(req.params.blogId);
  res.sendStatus(HttpStatus.NoContent);
};
