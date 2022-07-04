import Sequelize from "sequelize";

class Comments extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
          primaryKey: true,
        },
        postings_id: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: "Postings",
            key: "id",
          },
        },
        users_id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          allowNull: true,
          references: {
            model: "Users",
            key: "id",
          },
        },
        content: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        created_at: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn("NOW"),
          allowNull: false,
        },
        updated_at: {
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
        modelName: "Comments",
        tableName: "comments",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      },
    );
  }
  static associate(models) {
    models.Comments.belongsTo(models.Users, {
      foreignKey: "users_id",
      targetkey: "id",
      onDelete: "cascade",
      onUpdate: "cascade",
    });
    models.Comments.belongsTo(models.Postings, {
      foreignKey: "postings_id",
      targetkey: "id",
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  }
}

export default Comments;
