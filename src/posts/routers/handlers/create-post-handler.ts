import { Response, Request } from "express";
import { Post } from "../../types/post";
import { postsRepository } from "../../../repositories/posts-repository";
import { PostInputDto } from "../../dto/post.input.dto";
import { HttpStatus } from "../../../core/types/http-statuses";

export const createPostHandler = (
  req: Request<{}, Post, PostInputDto>,
  res: Response,
) => {
  const createdPost: Post = postsRepository.createPost(req.body);

  res.status(HttpStatus.Created).send(createdPost);
};
