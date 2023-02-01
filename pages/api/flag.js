// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { JWTSecret } from "../../components/Login";
import jwt from "jsonwebtoken";
export default function handler(req, res) {
  const userJWTToken = req.headers["ctf-jwttoken"];
  jwt.verify(userJWTToken, 'mysecrettoken', (err, info) => {
    if (err || info.role !== "admin") {
      res.status(401).json({ success: false, message: "Not Allowed!" });
    } else {
      res.status(200).json({
        success: true,
        message: `flag{y0u_4r3_4w350me!!!}`,
      });
    }
  });
}
