import { Request, Response } from "express";
import { Post } from "../../types/post";
import { postsRepository } from "../../../repositories/posts-repository";
import { HttpStatus } from "../../../core/types/http-statuses";
import { createErrorMessages } from "../../../middlewares/input-validation-result.middleware";
import { ValidationErrorDto } from "../../../core/types/validation-error";

export const getPostHandler = (
  req: Request<{ postId: string }>,
  res: Response<Post | ValidationErrorDto>,
) => {
  const post = postsRepository.getPostById(req.params.postId);

  if (!post) {
    res
      .status(HttpStatus.NotFound)
      .send(createErrorMessages([{ field: "id", message: "Post not found" }]));
    return;
  }

  res.status(HttpStatus.Ok).send(post);
};
