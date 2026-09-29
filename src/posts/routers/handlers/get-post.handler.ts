import { Request, Response } from "express";
import { Post } from "../../types/post";
import { HttpStatus } from "../../../core/types/http-statuses";
import { createErrorMessages } from "../../../core/middlewares/input-validation-result.middleware";
import { ValidationErrorDto } from "../../../core/types/validation-error";
import { postsRepository } from "../../../repositories/posts-repository";
import { mapToPostViewModel } from "../mappers/map-to-post-view-model.util";

export async function getPostHandler(
  req: Request<{ postId: string }>,
  res: Response<Post | ValidationErrorDto>,
) {
  try {
    const postId = req.params.postId;
    const post = await postsRepository.getPostById(postId);

    if (!post) {
      res
        .status(HttpStatus.NotFound)
        .send(
          createErrorMessages([{ field: "id", message: "Post not found" }]),
        );
      return;
    }
    const postViewModel = mapToPostViewModel(post);
    res.status(HttpStatus.Ok).send(postViewModel);
  } catch {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}
