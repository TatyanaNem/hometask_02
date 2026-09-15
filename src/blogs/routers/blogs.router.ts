import { Router, Request, Response } from "express";
import { inMemoryDB } from "../../db/in-memory.db";
import { BLOGS_ROUTES } from "../constants/blogs.paths";
import { Blog } from "../types/blog";

export const blogsRouter = Router({ mergeParams: true });

blogsRouter.get(BLOGS_ROUTES.ROOT, (req: Request, res: Response) => {
  res.status(200).send(inMemoryDB.blogs);
});

blogsRouter.get(BLOGS_ROUTES.BY_ID, (req: Request, res: Response) => {
  const blog = inMemoryDB.blogs.find((b) => b.id === +req.params.blogId);

  if (!blog) {
    res.sendStatus(404);
    return;
  }

  res.status(200).send(blog);
});

blogsRouter.post(BLOGS_ROUTES.ROOT, (req: Request, res: Response) => {
  const lastVideo = inMemoryDB.blogs[inMemoryDB.blogs.length - 1];
  const createdBlog = {
    id: lastVideo ? lastVideo.id + 1 : 1,
    ...req.body,
  };
  inMemoryDB.blogs.push(createdBlog);

  res.status(201).send(createdBlog);
});

blogsRouter.put(BLOGS_ROUTES.BY_ID, (req: Request, res: Response) => {
  inMemoryDB.blogs.map((blog: Blog) => {
    if (blog.id === +req.params.id) {
      return {
        ...blog,
        ...req.body,
      };
    }
    return blog;
  });

  res.sendStatus(204);
});

blogsRouter.delete(BLOGS_ROUTES.BY_ID, (req: Request, res: Response) => {
  const blog = inMemoryDB.blogs.filter((b) => b.id !== +req.params.id);

  if (!blog) {
    res.sendStatus(404);
    return;
  }

  res.sendStatus(204);
});
