import { Sequelize, DataTypes } from "sequelize";
import { DATABASE_URL, DB_DIALECT, DB_LOGGING } from ".";

const sequelize = new Sequelize(String(DATABASE_URL), {
  dialect: DB_DIALECT as any,
  logging: DB_LOGGING === "true" ? console.log : false,
  define: {
    underscored: true,
    timestamps: true,
    freezeTableName: true,
  },
});

// Modelo de Usuario
const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "full_name",
    },
  },
  {
    tableName: "users",
  }
);

// Modelo de Producto
const Product = sequelize.define(
  "Product",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    available: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  },
  {
    tableName: "products",
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log("✅ Conectado a la base de datos y sincronizado modelos");
  } catch (error) {
    console.error("❌ Error al conectar o sincronizar la base de datos:", error);
  }
})();

export const db = {
  sequelize,
  Product,
  User,
};
