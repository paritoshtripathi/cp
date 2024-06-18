const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://user:password@localhost:5432/mydb');

const User = sequelize.define('User', {
  username: { type: Sequelize.STRING, unique: true },
  password: Sequelize.STRING,
  role: Sequelize.STRING,
  tenantId: Sequelize.INTEGER,
});

const Tenant = sequelize.define('Tenant', {
  name: { type: Sequelize.STRING, unique: true },
});

User.belongsTo(Tenant);

module.exports = { sequelize, User, Tenant };
