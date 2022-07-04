import Comment from "./comment";
import Likes from "./like_users_postings";
import Posting from "./posting";
import User from "./user";

class ModelManager {
  async initialize(sequelize) {
    // 각각 모델의 dependency가 있기 때문에 순서에 맞게 sync를 해야 합니다.
    User.init(sequelize);
    Posting.init(sequelize);
    Comment.init(sequelize);
    Likes.init(sequelize);

    // await User.sync();
    // await Posting.sync();
    // await Comment.sync();

    // User.associate(sequelize.models);
    Posting.associate(sequelize.models);
    Comment.associate(sequelize.models);
  }
}

const modelManager = new ModelManager();

export default modelManager;
