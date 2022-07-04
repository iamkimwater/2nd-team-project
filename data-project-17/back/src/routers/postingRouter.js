import express from "express";
import mysqlManager from "../../db";
import { Sequelize, Op } from "sequelize";
import Comments from "../../db/models/comment";
import Users from "../../db/models/user";
import Postings from "../../db/models/posting";
import Likes from "../../db/models/like_users_postings";
import { login_required } from "../middlewares/login_required";

const postingRouter = express.Router();

// 게시글 생성
postingRouter.post("/postings/posting", login_required, async (req, res, next) => {
  try {
    const posting = {
      users_id: req.user.id,
      article: req.body.article,
      file_url: req.body.file_url,
    };

    Postings.create(posting);
    res.status(200).json("success");
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// 등록된 모든 게시글 조회-> 최신 작성순
postingRouter.get("/postingList", login_required, async (req, res, next) => {
  try {
    const postings = await Postings.findAll({
      include: [
        {
          model: Users,
          attributes: ["nickname", "profile_url"],
        },
        {
          model: Comments,
          include: [
            {
              model: Users,
              attributes: ["nickname", "profile_url"],
            },
          ],
        },
        {
          model: Likes,
          attributes: ["users_id"],
        },
      ],
      order: [
        ["created_at", "DESC"],
        [Comments, "created_at", "ASC"],
      ],
    });
    res.status(200).json(postings);
  } catch (error) {
    next(error);
  }
});

// 게시글 1개 조회
postingRouter.get("/postings/:id", login_required, async (req, res, next) => {
  try {
    const posting = await Postings.findAll({
      where: { id: req.params.id },
      include: [
        {
          model: Users,
          attributes: ["nickname", "profile_url"],
        },
        {
          model: Comments,
          include: [
            {
              model: Users,
              attributes: ["nickname", "profile_url"],
            },
          ],
        },
        {
          model: Likes,
          attributes: ["users_id"],
        },
      ],
      order: [
        ["created_at", "DESC"],
        [Comments, "created_at", "ASC"],
      ],
    });

    res.status(200).json(posting);
  } catch (error) {
    next(error);
  }
});

// "마이페이지" User가 좋아요 누른 게시물만 조회하기
postingRouter.get("/postings/:users_id/like_postings", login_required, async (req, res, next) => {
  try {
    const users_id = req.user.id;
    const like_posting = await Likes.findAll({
      where: { users_id },
      include: [
        {
          model: Postings,
          include: [
            {
              model: Users,
              attributes: ["nickname", "profile_url"],
            },
            {
              model: Comments,
              include: [
                {
                  model: Users,
                  attributes: ["nickname", "profile_url"],
                },
              ],
            },
            {
              model: Likes,
              attributes: ["users_id"],
            },
          ],
          order: [
            ["created_at", "DESC"],
            [Comments, "created_at", "ASC"],
          ],
        },
      ],
    });
    res.status(200).json(like_posting);
  } catch (error) {
    next(error);
  }
});

// "마이페이지" User가 작성한 게시물만 조회하기
postingRouter.get("/postings/:users_id/postings", login_required, async (req, res, next) => {
  try {
    const users_id = req.user.id;

    const postings = await Postings.findAll({
      where: { users_id },
      include: [
        {
          model: Users,
          attributes: ["nickname", "profile_url"],
        },
        {
          model: Comments,
          include: [
            {
              model: Users,
              attributes: ["nickname", "profile_url"],
            },
          ],
        },
        {
          model: Likes,
          attributes: ["users_id"],
        },
      ],
      order: [
        ["created_at", "DESC"],
        [Comments, "created_at", "ASC"],
      ],
    });
    res.status(200).json(postings);
  } catch (error) {
    next(error);
  }
});

// 게시글 수정(제목, 내용만 수정 가능) -> 수정완료하면 수정된 게시물 조회됨
postingRouter.put("/postings/:id", login_required, async (req, res, next) => {
  try {
    const posting = await Postings.findOne({ where: { id: req.params.id } });
    if (!posting) {
      return res.status(403).send("존재하지 않는 게시글입니다.");
    }
    await Postings.update({ article: req.body.article }, { where: { id: req.params.id } });
    const updatedPosting = await Postings.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: Users,
          attributes: ["nickname", "profile_url"],
        },
        {
          model: Comments,
          include: [
            {
              model: Users,
              attributes: ["nickname", "profile_url"],
            },
          ],
        },
        {
          model: Likes,
          attributes: ["users_id"],
        },
      ],
      order: [
        ["created_at", "DESC"],
        [Comments, "created_at", "ASC"],
      ],
    });
    res.status(200).json(updatedPosting);
  } catch (error) {
    next(error);
  }
});

// 게시글 삭제
postingRouter.delete("/postings/:id", login_required, async (req, res, next) => {
  try {
    Postings.destroy({
      where: { id: req.params.id },
    });
    res.status(200).json({ id: req.params.id }); //id에 담아서 프론트에 넘겨줌
  } catch (error) {
    next(error);
  }
});

// 게시물 좋아요
postingRouter.post("/postings/:postings_id/like", login_required, async (req, res, next) => {
  try {
    const users_id = req.user.id;
    const postings_id = req.params.postings_id;

    // const posting = await Postings.findOne({ where: { postings_id } });
    // if (!posting) {
    //   return res.status(403).send("존재하지 않는 게시글입니다.");
    // }
    const liked = await Likes.create({ users_id, postings_id });

    res.status(200).json(liked);
  } catch (error) {
    next(error);
  }
});

// 게시물 좋아요 취소
postingRouter.delete("/postings/:postings_id/like", login_required, async (req, res, next) => {
  try {
    const users_id = req.user.id;
    const postings_id = req.params.postings_id;

    // const posting = await Postings.findOne({ where: { postings_id } });
    // if (!posting) {
    //   return res.status(403).send("존재하지 않는 게시글입니다.");
    // }
    Likes.destroy({ where: { users_id, postings_id } });
    res.status(200).json({ postings_id });
  } catch (error) {
    next(error);
  }
});

export default postingRouter;
