import jwt from "jsonwebtoken";

const { verify } = jwt;

import { env } from "process";
import userModel from "../models/userModel.js";

const requireAuth = async (req, res, next) => {
  // verify authentication
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "authorization token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = verify(token, env.SECRET);

    req.user = await userModel.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    res.status(401).json({ error: "Request is not authorized" });
  }
};

export default requireAuth;
