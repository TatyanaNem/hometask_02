import { Router, Request, Response } from "express";
import { POSTS_ROUTES } from "../constants/posts.paths";
import { getPostsListHandler } from "./handlers/get-posts-list.handler";
import { getPostHandler } from "./handlers/get-post.handler";
import { updatePostHandler } from "./handlers/update-post.handler";
import { deletePostHandler } from "./handlers/delete-post.handler";
import { createPostHandler } from "./handlers/create-post-handler";
import { postInputDtoValidation } from "../validation/post.input-dto.validation-middlewares";
import { idValidation } from "../../middlewares/validation/params-id.validation.middleware";
import { blogInputValidationResultMiddleware } from "../../middlewares/input-validation-result.middleware";

export const postsRouter = Router({ mergeParams: true });

postsRouter.get(POSTS_ROUTES.ROOT, getPostsListHandler);

postsRouter.get(
  POSTS_ROUTES.BY_ID,
  idValidation("postId"),
  blogInputValidationResultMiddleware,
  getPostHandler,
);

postsRouter.post(
  POSTS_ROUTES.ROOT,
  postInputDtoValidation,
  blogInputValidationResultMiddleware,
  createPostHandler,
);

postsRouter.put(
  POSTS_ROUTES.BY_ID,
  idValidation("postId"),
  postInputDtoValidation,
  blogInputValidationResultMiddleware,
  updatePostHandler,
);

postsRouter.delete(
  POSTS_ROUTES.BY_ID,
  idValidation("postId"),
  blogInputValidationResultMiddleware,
  deletePostHandler,
);
