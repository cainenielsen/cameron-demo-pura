const { Sequelize, Model, DataTypes } = require("sequelize");

const sequelize = new Sequelize("postgres", "postgres", "FwwEsf8llsodI8Hz", {
  host: "34.68.24.63",
  dialect: "postgres",
  define: {
    freezeTableName: true, // stops pluralizeation inference
  },
});

const SQLAuthTest = async function () {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

const User = sequelize.define(
  "User",
  {
    uid: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "active",
    },
  },
  {
    timestamps: true,
    tableName: "Users",
  }
);

const Product = sequelize.define(
    "Product",
    {
      uid: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "active",
      },
    },
    {
      timestamps: true,
      tableName: "Users",
    }
  );

// `sequelize.define` also returns the model
// console.log(User === sequelize.models.User);

const SQLInit = async function (options) {
  // Force drops the table a restarts it, good for testing, not for prod
  await User.sync({ force: false, alter: true });

  await sequelize.sync({ force: options.reset, alter: true });
  console.log("All models were synchronized successfully.");
};

module.exports = { sequelize, SQLAuthTest, SQLInit, User, Product };
