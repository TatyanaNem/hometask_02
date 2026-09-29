import { Response, Request } from "express";
import { Post } from "../../types/post";
import { postsRepository } from "../../../repositories/posts-repository";
import { PostInputDto } from "../../dto/post.input.dto";
import { HttpStatus } from "../../../core/types/http-statuses";
import { mapPostInputDtoToPost } from "../mappers/map-post-input-dto-to-post.util";
import { blogsRepository } from "../../../repositories/blogs-repository";
import { createErrorMessages } from "../../../core/middlewares/input-validation-result.middleware";
import { mapToPostViewModel } from "../mappers/map-to-post-view-model.util";

export async function createPostHandler(
  req: Request<{}, Post, PostInputDto>,
  res: Response,
) {
  try {
    const blogId = req.body.blogId;
    const blog = await blogsRepository.getBlogById(blogId);

    if (!blog) {
      res
        .status(HttpStatus.BadRequest)
        .send(
          createErrorMessages([{ field: "blogId", message: "Blog not found" }]),
        );
      return;
    }
    const newPost: Post = {
      ...mapPostInputDtoToPost(req.body, blog),
      createdAt: new Date(),
    };

    const createdPost = await postsRepository.createPost(newPost);
    const postViewModel = mapToPostViewModel(createdPost);
    res.status(HttpStatus.Created).send(postViewModel);
  } catch {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}
