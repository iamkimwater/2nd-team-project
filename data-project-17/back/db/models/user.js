import Sequelize from "sequelize";

class Users extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
          primaryKey: true,
        },
        email: {
          type: Sequelize.STRING(200),
          allowNull: false,
          unique: true,
        },
        password: {
          type: Sequelize.STRING(200),
          allowNull: false,
        },
        nickname: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        is_vegan: {
          type: Sequelize.TINYINT,
          allowNull: true,
        },
        profile_url: {
          type: Sequelize.STRING(200),
          allowNull: true,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn("NOW"),
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn("NOW"),
        },
        is_deleted: {
          type: Sequelize.TINYINT,
          allowNull: true,
        },
        description: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: false,
        modelName: "Users",
        tableName: "users",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      },
    );
  }
  static associate(models) {
    models.Users.hasMany(models.Postings, {
      foreignKey: "users_id",
      sourceKey: "id",
      onDelete: "cascade",
      onUpdate: "cascade",
    });
    models.Users.hasMany(models.Comments, {
      foreignKey: "users_id",
      sourceKey: "id",
      onDelete: "cascade",
      onUpdate: "cascade",
    });
    models.Users.belongsToMany(models.Postings, { through: "Like", as: "Liked" });
  }
}

export default Users;
