import express from "express";
import mysqlManager from "../../db";
import Users from "../../db/models/user";
import Postings from "../../db/models/posting";
import bcrypt from "bcrypt";
import passport from "passport";
import jwt from "jsonwebtoken";
import { login_required } from "../middlewares/login_required";
import upload from "../utils/upload";

const userAuthRouter = express.Router();

userAuthRouter.get("/users/:id", async (req, res, next) => {
  try {
    const user = await Users.findOne({
      where: { id: req.params.id },
    });
    if (!user) {
      return res.send("없는 사용자입니다.");
    }
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

userAuthRouter.post("/users", async (req, res) => {
  const duplicate = await Users.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (duplicate) {
    return res.status(403).send("중복된 이메일입니다");
  }
  const hashedPassword = await bcrypt.hash(req.body.password, 8);

  const user = {
    email: req.body.email,
    password: hashedPassword,
    nickname: req.body.nickname,
    is_vegan: req.body.is_vegan,
    profile_url: req.body.profile_url,
    description: req.body.description,
  };

  await Users.create(user)
    .then((result) => {
      console.log("success");
    })
    .catch((err) => {
      console.log(err);
    });
  res.status(200).json(user);
});

userAuthRouter.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, Users, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      return res.status(401).send(info.message);
    }
    return req.login(Users, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }

      const email = req.body.email;
      const password = req.body.password;
      const token = jwt.sign(
        {
          type: "JWT",
          email,
          password,
        },
        process.env.JWT_SECRET_KEY,
      );

      res.cookie("token", token);
      return res.json(Users);
    });
  })(req, res, next);
});

userAuthRouter.post("/logout", (req, res) => {
  req.logout();
  res.clearCookie("token");
  res.send("ok");
});

userAuthRouter.patch("/users/:id", async (req, res, next) => {
  try {
    const user = await Users.update(
      {
        nickname: req.body.nickname,
        description: req.body.description,
      },
      {
        where: { id: req.user.dataValues.id },
      },
    );
    res.status(200);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 폼마다 형식이 다르기 떄문에 라우터마다 별도의 세팅 필요
// storage 옵션만 s3로 바꾸면 멀터가 알아서 스토리지로 올려줌
userAuthRouter.post("/profile", upload.single("image"), login_required, async (req, res) => {
  console.log(req.file);
  await req.user.update({ profile_url: req.file.location });
  res.json(req.file);
});
//upload array = 여러장 / single = 한장

userAuthRouter.get("/me", login_required, async (req, res) => {
  res.json(req.user);
});

userAuthRouter.put("/nickname", login_required, async (req, res) => {
  req.user = await req.user.update({ nickname: req.body.nickname });
  res.json(req.user);
});

userAuthRouter.put("/description", login_required, async (req, res) => {
  req.user = await req.user.update({ description: req.body.description });
  res.json(req.user);
});

userAuthRouter.get("/records/:id", async (req, res) => {
  try {
    const months = [];
    months.push(0);
    const now = new Date();
    const year = now.getFullYear();

    for (let idx = 1; idx <= 12; idx++) {
      if (idx == 2) {
        months.push(
          months[idx - 1] + ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0 ? 29 : 28),
        );
      }
      if (idx == 1 || idx == 3 || idx == 5 || idx == 7 || idx == 8 || idx == 10 || idx == 12) {
        months.push(months[idx - 1] + 31);
      }
      if (idx == 4 || idx == 6 || idx == 9 || idx == 11) {
        months.push(months[idx - 1] + 30);
      }
    }
    console.log(months);
    const record = await Postings.findAll({
      raw: true,
      where: { users_id: req.params.id }, // 이번년도 것만 가져오도록 조건에 추가하셈
      attributes: ["created_at"],
    });

    let days = [];
    if (now.getMonth() < 12) {
      // days = Array.from({ length: months[6] }, () => 0);
      days = Array.from({ length: months[12] }, () => 0);
    }
    //day에다가 6보다 작으면 180일까지초기화

    for (let time of record) {
      time = time.created_at;
      const idx = months[time.getMonth()] + time.getDate() - 1;
      days[idx] += 1;
    }
    res.status(200).json(days);
  } catch (err) {
    console.log(err);
  }
});

export default userAuthRouter;
