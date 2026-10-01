import { Request, Response } from "express";
import { blogsRepository } from "../../../repositories/blogs-repository";
import { HttpStatus } from "../../../core/types/http-statuses";
import { BlogViewModel } from "../../types/blog-view-model";
import { mapToBlogViewModel } from "../mappers/map-to-blog-view-model.util";

export async function getBlogsListHandler(req: Request, res: Response<BlogViewModel[]>) {
  try {
    const blogs = await blogsRepository.getAllBlogs();
    res.status(HttpStatus.Ok).send(blogs.map(mapToBlogViewModel));
  } catch {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}
