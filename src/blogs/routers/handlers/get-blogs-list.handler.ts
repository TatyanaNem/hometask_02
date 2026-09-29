import { Request, Response } from "express";
import { Blog } from "../../types/blog";
import { blogsRepository } from "../../../repositories/blogs-repository";
import { HttpStatus } from "../../../core/types/http-statuses";

export async function getBlogsListHandler(req: Request, res: Response<Blog[]>) {
  try {
    const blog = await blogsRepository.getAllBlogs();
    if (!blog) {
      res.sendStatus(HttpStatus.NotFound);
      return;
    }
    res.status(HttpStatus.Ok).send(blog);
  } catch {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}
