import { Response, Request } from "express";
import { blogsRepository } from "../../../repositories/blogs-repository";
import { HttpStatus } from "../../../core/types/http-statuses";
import { createErrorMessages } from "../../../core/middlewares/input-validation-result.middleware";

export const deleteBlogHandler = (
  req: Request<{ blogId: string }>,
  res: Response,
) => {
  const isDeleted = blogsRepository.deleteBlog(req.params.blogId);

  if (!isDeleted) {
    res
      .status(HttpStatus.NotFound)
      .send(createErrorMessages([{ field: "id", message: "Blog not found" }]));
    return;
  }

  res.sendStatus(HttpStatus.NoContent);
};
