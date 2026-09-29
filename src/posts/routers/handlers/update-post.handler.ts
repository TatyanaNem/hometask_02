import { Request, Response } from "express";
import { postsRepository } from "../../../repositories/posts-repository";
import { PostInputDto } from "../../dto/post.input.dto";
import { HttpStatus } from "../../../core/types/http-statuses";
import { createErrorMessages } from "../../../core/middlewares/input-validation-result.middleware";

export async function updatePostHandler(
  req: Request<{ postId: string }, {}, PostInputDto>,
  res: Response,
) {
  try {
    const postTd = req.params.postId;
    const post = await postsRepository.getPostById(postTd);

    if (!post) {
      res
        .status(HttpStatus.BadRequest)
        .send(
          createErrorMessages([{ field: "id", message: "Post not found" }]),
        );
      return;
    }

    await postsRepository.updatePost(post, postTd);
    res.sendStatus(HttpStatus.NoContent);
  } catch {
    res.sendStatus(HttpStatus.InternalServerError);
    return;
  }
}
