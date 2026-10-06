// library
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

// helper function
import { getEnv } from "../../utils/getEnv.js";

// type
import type { JwtPayload } from "jsonwebtoken";

const verifyJwt = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    console.log("return error here");
    return res.status(401).json({ ok_verify_token: false, msg: "invalie" });
  }

  const token = authHeader.split(" ")[1];

  if (!token || token === "null" || token === "undefined") {
    return res.status(401).json({
      ok_verify_token: false,
      msg: "no token provided",
      code: "TOKEN_MISSING",
    });
  }

  try {
    const payload = jwt.verify(
      token,
      getEnv("ACCESS_TOKEN_SECRET"),
    ) as JwtPayload;
    req.body = {
      ...req.body,
      user_id: payload.user_id,
    };
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      console.log(error.name, error.message);
      return res.status(401).json({
        ok_verify_token: false,
        msg: "token expired",
        code: "TOKEN_EXPIRED",
      });
    }

    if (error instanceof jwt.JsonWebTokenError) {
      console.log(error.name, error.message);
      return res.status(401).json({
        ok_verify_token: false,
        msg: "invalid token",
        code: "TOKEN_INVALID",
      });
    }

    return next(error);
  }
};

export default verifyJwt;
