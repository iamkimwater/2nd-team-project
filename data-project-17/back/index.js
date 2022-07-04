import cors from "cors";
import express from "express";
import modelManager from "./db/models";
import mysqlManager from "./db";
import { sysLog, sysErrorLog, DatabaseError } from "./src/utils/logger";
import * as dotenv from "dotenv";
import swaggerDocument from "./src/swagger.json";
import { swaggerUi, specs } from "./src/modules/swagger";
import passport from "passport";
import passportConfig from "./passport";
import session from "express-session";
import cookieParser from "cookie-parser";
import userAuthRouter from "./src/routers/userRouter";
import postingRouter from "./src/routers/postingRouter";
import commentRouter from "./src/routers/commentRouter";

dotenv.config();
passportConfig();
const app = express();

const PORT = 5001;

mysqlManager.connect();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.DB_PASSWORD,
  }),
);
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("Hello Express");
});

app.use(userAuthRouter);
app.use(postingRouter);
app.use(commentRouter);

app.use("/uploads", express.static("uploads"));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument, { explorer: true }));

app.listen(PORT, () => {
  console.log(`정상적으로 서버를 시작하였습니다. http://localhost:${PORT}`);
});
