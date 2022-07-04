import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Users from "../../db/models/user";

exports.login_required = (req, res, next) => {
  const SECRET_KEY = process.env.JWT_SECRET_KEY;
  // 인증 완료
  try {
    jwt.verify(req.cookies.token, SECRET_KEY, async (err, decoded) => {
      if (err) {
        return res.status(401).send("로그인이 필요합니다.");
      }
      const user = await Users.findOne({
        where: { email: decoded.email },
      });
      req.user = user;
      return next();
    });
  } catch (error) {
    // 인증 실패
    // 토큰의 비밀키가 일치하지 않는 경우
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        code: 401,
        message: "유효하지 않은 토큰입니다.",
      });
    }
  }
};
