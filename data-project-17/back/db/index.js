import Sequelize from "sequelize";
import modelManager from "./models";
import dotenv from "dotenv";

class MysqlManager {
  constructor() {
    this.sequelize = null;
  }

  async connect() {
    try {
      this.sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USERNAME,
        process.env.DB_PASSWORD,
        {
          dialect: "mysql",
          host: process.env.DB_HOST,
          port: process.env.DB_PORT,
          define: {
            timestamps: false,
          },
          logging: true,
        },
      );

      await this.sequelize.authenticate();
      console.log(__filename, "Mysql connection has been established successfully");

      modelManager.initialize(this.sequelize);

      // sequelize 객체에 등록된 모델 목록을 가져온다
      Object.values(this.sequelize.models)
        // associate 함수가 있는 모델만 필터링한다.
        .filter((model) => typeof model.associate === "function")
        // associate() 함수를 실행하여 테이블간 관계를 설정한다
        .filter((model) => model.associate(this.sequelize.models));
    } catch (e) {
      console.log(__filename, `mysql connection failed: ${e}`);
    }
  }

  getTransaction() {
    return this.sequelize.transaction();
  }
}

const mysqlManager = new MysqlManager();

export default mysqlManager;
