import { Response, Request } from "express";
import { postsRepository } from "../../../repositories/posts-repository";
import { HttpStatus } from "../../../core/types/http-statuses";
import { createErrorMessages } from "../../../core/middlewares/input-validation-result.middleware";

export const deletePostHandler = async (
  req: Request<{ postId: string }>,
  res: Response,
) => {
  try {
    const id = req.params.postId;
    const isDeleted = await postsRepository.deletePost(id);

    if (!isDeleted) {
      res
        .status(HttpStatus.NotFound)
        .send(
          createErrorMessages([{ field: "id", message: "Post not found" }]),
        );
      return;
    }
    res.sendStatus(HttpStatus.NoContent);
  } catch {
    res.sendStatus(HttpStatus.InternalServerError);
  }
};
