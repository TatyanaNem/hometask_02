import { Request, Response } from "express";
import { Post } from "../../types/post";
import { postsRepository } from "../../../repositories/posts-repository";
import { HttpStatus } from "../../../core/types/http-statuses";
import { mapToPostViewModel } from "../mappers/map-to-post-view-model.util";

export async function getPostsListHandler(req: Request, res: Response<Post[]>) {
  try {
    const posts = await postsRepository.getAllPosts();
    const postViewModels = posts.map(mapToPostViewModel);
    res.status(HttpStatus.Ok).send(postViewModels);
  } catch {
    res.sendStatus(HttpStatus.InternalServerError);
    return;
  }
}
