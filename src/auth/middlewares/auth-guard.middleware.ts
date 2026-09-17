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

  if (
    Buffer.from(token, "base64").toString("utf-8") ===
    `${ADMIN_USERNAME}:${ADMIN_PASSWORD}`
  ) {
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
};
