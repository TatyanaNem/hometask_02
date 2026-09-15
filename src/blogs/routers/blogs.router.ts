import { Router, Request, Response } from "express";
import { inMemoryDB } from "../../db/in-memory.db";
import { BLOGS_ROUTES } from "../constants/blogs.paths";
import { Blog } from "../types/blog";
import { getBlogsListHandler } from "./handlers/get-blogs-list.handler";
import { getBlogHandler } from "./handlers/get-blog.handler";
import { updateBlogHandler } from "./handlers/update-blog.handler";
import { deleteBlogHandler } from "./handlers/delete-blog.handler";
import { createBlogHandler } from "./handlers/create-blog-handler";

export const blogsRouter = Router({ mergeParams: true });

blogsRouter.get(BLOGS_ROUTES.ROOT, getBlogsListHandler);

blogsRouter.get(BLOGS_ROUTES.BY_ID, getBlogHandler);

blogsRouter.post(BLOGS_ROUTES.ROOT, createBlogHandler);

blogsRouter.put(BLOGS_ROUTES.BY_ID, updateBlogHandler);

blogsRouter.delete(BLOGS_ROUTES.BY_ID, deleteBlogHandler);
