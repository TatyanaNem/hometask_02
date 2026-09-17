import { Request, Response } from "express";
import { Post } from "../../types/post";
import { postsRepository } from "../../../repositories/posts-repository";
import { HttpStatus } from "../../../core/types/http-statuses";

export const getPostsListHandler = (req: Request, res: Response<Post[]>) => {
  res.status(HttpStatus.Ok).send(postsRepository.getAllPosts());
};
