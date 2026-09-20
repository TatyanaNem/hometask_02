import { NextFunction, Request, Response } from "express";
import { ADMIN_PASSWORD, ADMIN_USERNAME } from "../../settings/config";

export const authGuardMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    res.status(401).send("Unauthorized");
    return;
  }

  const [scheme, token] = authHeader.split(" ");

  if (scheme !== "Basic" || !token) {
    res.status(401).send("Unauthorized");
    return;
  }

  const encodedCredentials = Buffer.from(
    `${ADMIN_USERNAME}:${ADMIN_PASSWORD}`,
  ).toString("base64");

  if (token === encodedCredentials) {
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
};
