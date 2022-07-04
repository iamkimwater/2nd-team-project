import express from "express";
import mysqlManager from "../../db";
import Sequelize from "sequelize";
import Comments from "../../db/models/comment";
import Users from "../../db/models/user";
import Postings from "../../db/models/posting";
import { login_required } from "../middlewares/login_required";

const commentRouter = express.Router();

// 댓글 생성
commentRouter.post("/:postings_id/comments/comment", login_required, async (req, res, next) => {
  try {
    const posting = await Postings.findOne({ where: { id: req.params.postings_id } });
    if (!posting) {
      return res.status(403).send("존재하지 않는 게시글입니다.");
    }
    const comment = await Comments.create({
      users_id: req.user.id,
      postings_id: req.params.postings_id,
      content: req.body.content,
    });
    res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
});

// 댓글 조회
commentRouter.get(
  "/postings/:postings_id/comments/:comments_id",
  login_required,
  async (req, res, next) => {
    try {
      const posting = Postings.findOne({ where: { id: req.params.postings_id } });
      if (!posting) {
        return res.status(403).send("존재하지 않는 게시글입니다.");
      }
      const comment = await Comments.findOne({
        where: { id: req.params.comments_id },
      });
      res.status(200).json(comment);
    } catch (error) {
      next(error);
    }
  },
);

// 1개 게시물에 대한 모든 댓글 조회
commentRouter.get("/postings/:postings_id/comments/", login_required, async (req, res, next) => {
  try {
    const postings_id = req.params.postings_id;
    const posting = Postings.findOne({ where: { id: postings_id } });
    if (!posting) {
      return res.status(403).send("존재하지 않는 게시글입니다.");
    }
    const comments = await Comments.findAll({
      where: { postings_id },
      include: [
        {
          model: Users,
          attributes: ["nickname", "profile_url"],
        },
      ],
      order: [["created_at", "ASC"]],
    });
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
});

// 댓글 수정
commentRouter.put(
  "/postings/:postings_id/comments/:comments_id",
  login_required,
  async (req, res, next) => {
    try {
      const posting = Postings.findOne({ where: { id: req.params.postings_id } });
      if (!posting) {
        return res.status(403).send("존재하지 않는 게시글입니다.");
      }
      await Comments.update(
        { content: req.body.content },
        { where: { id: req.params.comments_id } },
      );
      res.status(200).json("success");
    } catch (error) {
      next(error);
    }
  },
);

// 댓글 삭제
commentRouter.delete(
  "/postings/:postings_id/comments/:comments_id",
  login_required,
  async (req, res, next) => {
    try {
      const posting = await Postings.findOne({ where: { id: req.params.postings_id } });
      if (!posting) {
        return res.status(403).send("존재하지 않는 게시글입니다.");
      }
      Comments.destroy({
        where: { id: req.params.comments_id },
      });
      res.json({
        postings_id: req.params.postings_id,
        comments_id: req.params.comments_id,
        users_id: req.user.id,
      });
    } catch (error) {
      next(error);
    }
  },
);

export default commentRouter;
