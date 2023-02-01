// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { JWTSecret } from "../../components/Login";
import jwt from "jsonwebtoken";
export default function handler(req, res) {
  const { username, password } = req.body;

  try {
    if (username === "admin" && password === "secret123") {
      const token = jwt.sign({ username, role: "user" }, 'mysecrettoken');
      console.log(token)

      console.log("🚀 ~ file: login.js ~ line 11 ~ handler ~ token", token);
      return res.status(200).json({
        success: true,
        token: token,
      });
    } else {
      throw "Wrong Username/Password!";
    }
  } catch (e) {
    console.log("🚀 ~ file: login.js ~ line 15 ~ handler ~ e", e);
    return res.status(401).json({
      success: false,
      token: "",
      message: e,
    });
  }
}
