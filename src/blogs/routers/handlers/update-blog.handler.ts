import { Request, Response } from "express";
import { blogsRepository } from "../../../repositories/blogs-repository";
import { BlogInputDto } from "../../dto/blog.input.dto";
import { HttpStatus } from "../../../core/types/http-statuses";
import { createErrorMessages } from "../../../core/middlewares/input-validation-result.middleware";

export async function updateBlogHandler(
  req: Request<{ blogId: string }, {}, BlogInputDto>,
  res: Response,
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

    const isUpdated = await blogsRepository.updateBlog(
      req.body,
      req.params.blogId,
    );
    if (!isUpdated) {
      res
        .status(HttpStatus.NotFound)
        .send(
          createErrorMessages([{ field: "id", message: "Blog not updated" }]),
        );
      return;
    }
    res.sendStatus(HttpStatus.NoContent);
  } catch {
    res.sendStatus(HttpStatus.InternalServerError);
    return;
  }
}
