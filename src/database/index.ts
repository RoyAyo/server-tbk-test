import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize({
    dialect: 'mysql',
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// since there are two basic models, I can define here.
export const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    walletAddress: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nonce: DataTypes.STRING,
    isWhitelisted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
}, {
    timestamps: false,
});

export const Event = sequelize.define('event', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: false
});

(async () => {
    try {
      //Create Relationship
      User.hasMany(Event, { "as": "events", foreignKey: "user_id" });
      Event.belongsTo(User, { "as": "user", foreignKey: "user_id"} );
      await sequelize.authenticate();
      await sequelize.sync({force: true});
      console.log("Database and Tables connected successfully");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
})();