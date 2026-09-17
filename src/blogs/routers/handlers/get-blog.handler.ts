import { Request, Response } from "express";
import { Blog } from "../../types/blog";
import { blogsRepository } from "../../../repositories/blogs-repository";
import { HttpStatus } from "../../../core/types/http-statuses";
import { createErrorMessages } from "../../../core/middlewares/input-validation-result.middleware";
import { ValidationErrorDto } from "../../../core/types/validation-error";

export const getBlogHandler = (
  req: Request<{ blogId: string }>,
  res: Response<Blog | ValidationErrorDto>,
) => {
  const blog = blogsRepository.getBlogById(req.params.blogId);

  if (!blog) {
    res
      .status(HttpStatus.NotFound)
      .send(createErrorMessages([{ field: "id", message: "Blog not found" }]));
    return;
  }

  res.status(HttpStatus.Ok).send(blog);
};
