import passport from "passport";
import local from "./local";
import google from "./googleStrategy";
import kakao from "./kakaoStrategy";
import Users from "../db/models/user";

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.email);
  });

  passport.deserializeUser((email, done) => {
    Users.findOne({ where: { email } })
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });
  local(); // 로컬전략
  google(); // 구글 전략
  kakao();
};
