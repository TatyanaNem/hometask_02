import { Response, Request } from "express";
import { Blog } from "../../types/blog";
import { blogsRepository } from "../../../repositories/blogs-repository";
import { BlogInputDto } from "../../dto/blog.input.dto";
import { HttpStatus } from "../../../core/types/http-statuses";
import { mapToBlogViewModel } from "../mappers/map-to-blog-view-model.util";

export async function createBlogHandler(
  req: Request<{}, Blog, BlogInputDto>,
  res: Response,
) {
  try {
    const createdBlog = await blogsRepository.createBlog(req.body);
    res.status(HttpStatus.Created).send(mapToBlogViewModel(createdBlog));
  } catch {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}
