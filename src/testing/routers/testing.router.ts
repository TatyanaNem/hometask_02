import { Router, Response, Request } from "express";
import { HttpStatus } from "../../core/types/http-statuses";
import { inMemoryDB } from "../../db/in-memory.db";
import { TESTING_ROUTES } from "../constants/testing.paths";

export const testingRouter = Router({ mergeParams: true });

testingRouter.delete(TESTING_ROUTES.ALL_DATA, (req: Request, res: Response) => {
  inMemoryDB.posts = [];
  res.sendStatus(HttpStatus.NoContent);
});
