const { Sequelize } = require("sequelize");
const { DB_URL } = require("../../config");

const sequelize = new Sequelize(DB_URL, {
    logging: (e) => console.log("SQL: ", e),
});

async function psql() {
    const db = {};

    // models

    // relations

    sequelize.sync({ force: false });
    return db;
}

module.exports = psql;
