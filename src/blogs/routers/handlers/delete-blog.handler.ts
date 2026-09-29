import { Response, Request } from "express";
import { blogsRepository } from "../../../repositories/blogs-repository";
import { HttpStatus } from "../../../core/types/http-statuses";
import { createErrorMessages } from "../../../core/middlewares/input-validation-result.middleware";

export async function deleteBlogHandler(
  req: Request<{ blogId: string }>,
  res: Response,
) {
  try {
    const id = req.params.blogId;
    const isDeleted = await blogsRepository.deleteBlog(id);
    if (!isDeleted) {
      res
        .status(HttpStatus.NotFound)
        .send(
          createErrorMessages([{ field: "id", message: "Blog not found" }]),
        );
      return;
    }
    res.sendStatus(HttpStatus.NoContent);
  } catch {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}
