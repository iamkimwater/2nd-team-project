import Sequelize from "sequelize";

class Likes extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: Sequelize.STRING(36),
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
          primaryKey: true,
        },
        users_id: {
          type: Sequelize.STRING(36),
          allowNull: false,
          references: {
            model: "Users",
            key: "id",
          },
        },
        postings_id: {
          type: Sequelize.STRING(36),
          allowNull: false,
          references: {
            model: "Postings",
            key: "id",
          },
        },
        created_at: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn("NOW"),
          allowNull: false,
        },
        is_deleted: {
          type: Sequelize.TINYINT,
          defaultValue: 0,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscore: false,
        modelName: "Likes",
        tableName: "like_users_postings",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      },
    );
  }
  static associate(models) {
    Likes.belongsTo(models.Users, {
      foreignKey: "users_id",
      targetkey: "id",
      onDelete: "cascade",
      onUpdate: "cascade",
    });
    Likes.belongsTo(models.Postings, {
      foreignKey: "postings_id",
      targetkey: "id",
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  }
}

export default Likes;
