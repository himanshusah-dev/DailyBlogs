const express = require('express');
const cors = require("cors");
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const bcrypt = require('bcrypt')
const z = require("zod");
const { userRoute } = require('./user.router');
const { blogRoutes } = require('./blogs.router');




const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1/user", userRoute);
app.use("/api/v1/blog", blogRoutes)



async function main() {
    try {
        mongoose.connect("mongodb://localhost:27017/YourBlog")
        console.log("data base connected ...");
        app.listen(8000, () => {
            console.log("server started at the port 8000")
        })
    } catch (error) {
        console.log(error)
    }
}

main();