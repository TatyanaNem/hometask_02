import express, { Express } from "express";
import { blogsRouter } from "./blogs/routers/blogs.router";
import { BLOGS_PATH } from "./blogs/constants/blogs.paths";
import { postsRouter } from "./posts/routers/posts.router";
import { POSTS_PATH } from "./posts/constants/posts.paths";

export const setupApp = (app: Express) => {
  app.use(express.json());

  app.use(BLOGS_PATH, blogsRouter);
  app.use(POSTS_PATH, postsRouter);

  return app;
};
