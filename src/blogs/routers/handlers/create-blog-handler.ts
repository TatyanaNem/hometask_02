import { Response, Request } from "express";
import { Blog } from "../../types/blog";
import { blogsRepository } from "../../../repositories/blogs-repository";
import { BlogInputDto } from "../../dto/blog.input.dto";

export const createBlogHandler = (
  req: Request<{}, Blog, BlogInputDto>,
  res: Response,
) => {
  const createdBlog: Blog = blogsRepository.createBlog(req.body);

  res.status(201).send(createdBlog);
};
