import express, { Express } from "express";
import { blogsRouter } from "./blogs/routers/blogs.router";
import { BLOGS_PATH } from "./blogs/constants/blogs.paths";

export const setupApp = (app: Express) => {
  app.use(express.json());

  app.use(BLOGS_PATH, blogsRouter);

  return app;
};
