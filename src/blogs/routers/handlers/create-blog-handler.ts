import { Response, Request } from "express";
import { Blog } from "../../types/blog";
import { blogsRepository } from "../../../repositories/blogs-repository";
import { BlogInputDto } from "../../dto/blog.input.dto";
import { HttpStatus } from "../../../core/types/http-statuses";

export async function createBlogHandler(
  req: Request<{}, Blog, BlogInputDto>,
  res: Response,
) {
  try {
    const createdBlog: Blog = await blogsRepository.createBlog(req.body);
    res.status(HttpStatus.Created).send(createdBlog);
  } catch {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}
