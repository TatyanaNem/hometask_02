import { Request, Response } from "express";
import { blogsRepository } from "../../../repositories/blogs-repository";
import { BlogInputDto } from "../../dto/blog.input.dto";
import { HttpStatus } from "../../../core/types/http-statuses";
import { createErrorMessages } from "../../../middlewares/input-validation-result.middleware";

export const updateBlogHandler = (
  req: Request<{ blogId: string }, {}, BlogInputDto>,
  res: Response,
) => {
  const blog = blogsRepository.getBlogById(req.params.blogId);
  if (!blog) {
    res
      .status(HttpStatus.NotFound)
      .send(createErrorMessages([{ field: "id", message: "Blog not found" }]));
    return;
  }

  blogsRepository.updateBlog(req.body, req.params.blogId);
  res.sendStatus(HttpStatus.NoContent);
};
