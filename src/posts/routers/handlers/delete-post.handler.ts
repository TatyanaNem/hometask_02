import { Response, Request } from "express";
import { postsRepository } from "../../../repositories/posts-repository";
import { HttpStatus } from "../../../core/types/http-statuses";
import { createErrorMessages } from "../../../middlewares/input-validation-result.middleware";

export const deletePostHandler = (
  req: Request<{ postId: string }>,
  res: Response,
) => {
  const isDeleted = postsRepository.deletePost(req.params.postId);

  if (!isDeleted) {
    res
      .status(HttpStatus.NotFound)
      .send(createErrorMessages([{ field: "id", message: "Post not found" }]));
    return;
  }

  res.sendStatus(HttpStatus.NoContent);
};
