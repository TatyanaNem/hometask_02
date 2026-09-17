import { Request, Response } from "express";
import { postsRepository } from "../../../repositories/posts-repository";
import { PostInputDto } from "../../dto/post.input.dto";
import { HttpStatus } from "../../../core/types/http-statuses";
import { createErrorMessages } from "../../../middlewares/input-validation-result.middleware";

export const updatePostHandler = (
  req: Request<{ postId: string }, {}, PostInputDto>,
  res: Response,
) => {
  const isUpdated = postsRepository.updatePost(req.body, req.params.postId);

  if (!isUpdated) {
    res
      .status(HttpStatus.NotFound)
      .send(createErrorMessages([{ field: "id", message: "Post not found" }]));
    return;
  }

  res.sendStatus(HttpStatus.NoContent);
};
