import { Response, Request } from "express";
import { inMemoryDB } from "../../../db/in-memory.db";

export const deleteBlogHandler = (req: Request, res: Response) => {
  const blog = inMemoryDB.blogs.filter((b) => b.id !== +req.params.id);

  if (!blog) {
    res.sendStatus(404);
    return;
  }

  res.sendStatus(204);
};
