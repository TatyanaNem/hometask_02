import { Router, Request, Response } from "express";
import { BLOGS_ROUTES } from "../constants/blogs.paths";
import { getBlogsListHandler } from "./handlers/get-blogs-list.handler";
import { getBlogHandler } from "./handlers/get-blog.handler";
import { updateBlogHandler } from "./handlers/update-blog.handler";
import { deleteBlogHandler } from "./handlers/delete-blog.handler";
import { createBlogHandler } from "./handlers/create-blog-handler";
import { blogInputDtoValidation } from "../validation/blog.input-dto.validation-middlewares";
import { idValidation } from "../../core/middlewares/validation/params-id.validation.middleware";
import { blogInputValidationResultMiddleware } from "../../core/middlewares/input-validation-result.middleware";

export const blogsRouter = Router({ mergeParams: true });

blogsRouter.get(BLOGS_ROUTES.ROOT, getBlogsListHandler);

blogsRouter.get(
  BLOGS_ROUTES.BY_ID,
  idValidation("blogId"),
  blogInputValidationResultMiddleware,
  getBlogHandler,
);

blogsRouter.post(
  BLOGS_ROUTES.ROOT,
  blogInputDtoValidation,
  blogInputValidationResultMiddleware,
  createBlogHandler,
);

blogsRouter.put(
  BLOGS_ROUTES.BY_ID,
  idValidation("blogId"),
  blogInputDtoValidation,
  blogInputValidationResultMiddleware,
  updateBlogHandler,
);

blogsRouter.delete(
  BLOGS_ROUTES.BY_ID,
  idValidation("blogId"),
  blogInputValidationResultMiddleware,
  deleteBlogHandler,
);
