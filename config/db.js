const Sequelize = require('sequelize');
const db = new Sequelize('uptasknode', 'postgres', '2510', {
    host: 'localhost',
    port: '5432',
    dialect: 'postgres',
    operatorAliases: false,
    define: {
        timestamps: false,
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 3000,
        idle: 10000,
    }
});

module.exports = db;