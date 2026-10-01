import { Request, Response } from "express";
import { blogsRepository } from "../../../repositories/blogs-repository";
import { HttpStatus } from "../../../core/types/http-statuses";
import { createErrorMessages } from "../../../core/middlewares/input-validation-result.middleware";
import { ValidationErrorDto } from "../../../core/types/validation-error";
import { BlogViewModel } from "../../types/blog-view-model";
import { mapToBlogViewModel } from "../mappers/map-to-blog-view-model.util";

export async function getBlogHandler(
  req: Request<{ blogId: string }>,
  res: Response<BlogViewModel | ValidationErrorDto>,
) {
  try {
    const blog = await blogsRepository.getBlogById(req.params.blogId);
    if (!blog) {
      res
        .status(HttpStatus.NotFound)
        .send(
          createErrorMessages([{ field: "id", message: "Blog not found" }]),
        );
      return;
    }
    res.status(HttpStatus.Ok).send(mapToBlogViewModel(blog));
  } catch {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}
