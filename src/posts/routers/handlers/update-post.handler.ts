import { Request, Response } from "express";
import { postsRepository } from "../../../repositories/posts-repository";
import { blogsRepository } from "../../../repositories/blogs-repository";
import { PostInputDto } from "../../dto/post.input.dto";
import { HttpStatus } from "../../../core/types/http-statuses";
import { createErrorMessages } from "../../../core/middlewares/input-validation-result.middleware";
import { mapPostInputDtoToPost } from "../mappers/map-post-input-dto-to-post.util";

export async function updatePostHandler(
  req: Request<{ postId: string }, {}, PostInputDto>,
  res: Response,
) {
  try {
    const postId = req.params.postId;
    const post = await postsRepository.getPostById(postId);

    if (!post) {
      res
        .status(HttpStatus.BadRequest)
        .send(
          createErrorMessages([{ field: "id", message: "Post not found" }]),
        );
      return;
    }

    const blog = await blogsRepository.getBlogById(req.body.blogId);

    if (!blog) {
      res
        .status(HttpStatus.BadRequest)
        .send(
          createErrorMessages([{ field: "blogId", message: "Blog not found" }]),
        );
      return;
    }

    const updatedPost = {
      ...mapPostInputDtoToPost(req.body, blog),
      createdAt: post.createdAt,
    };

    await postsRepository.updatePost(updatedPost, postId);
    res.sendStatus(HttpStatus.NoContent);
  } catch {
    res.sendStatus(HttpStatus.InternalServerError);
    return;
  }
}
