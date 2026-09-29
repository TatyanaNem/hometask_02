import { Router, Response, Request } from "express";
import { HttpStatus } from "../../core/types/http-statuses";
import { TESTING_ROUTES } from "../constants/testing.paths";
import { getAllCollections } from "../../db/collections";

export const testingRouter = Router({ mergeParams: true });

testingRouter.delete(TESTING_ROUTES.ALL_DATA, async (req: Request, res: Response) => {
  await Promise.all(getAllCollections().map((collection) => collection.deleteMany({})));
  res.sendStatus(HttpStatus.NoContent);
});
