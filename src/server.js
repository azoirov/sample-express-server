const express = require("express");
const { PORT } = require("../config");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const postgres = require("./model/postgres");

async function server() {
    const app = express();

    const psql = await postgres();

    app.listen(PORT);

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use((req, res, next) => {
        req.psql = psql;
    });
    app.use(cors());

    fs.readdir(path.join(__dirname, "routes"), (err, files) => {
        if (files) {
            files.forEach((file) => {
                let routePath = path.join(__dirname, "routes", file);
                let Route = require(routePath);
                if (Route.path && Route.router)
                    app.use(Route.path, Route.router);
            });
        }
    });
}

server();
