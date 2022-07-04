import passport from "passport";
import Users from "../db/models/user";
import bcrypt from "bcrypt";
import passportLocal from "passport-local";

const Strategy = passportLocal.Strategy;

module.exports = () => {
  passport.use(
    new Strategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          const duplicate = await Users.findOne({
            where: { email },
          });

          if (!duplicate) {
            done(null, false, { message: "존재하는 않는 사용자입니다" });
          }

          const result = await bcrypt.compare(password, duplicate.password);

          if (result) {
            return done(null, duplicate);
          }
          return done(null, false, { message: "틀린 비밀번호" });
        } catch (error) {
          return done(error);
        }
      },
    ),
  );
};
