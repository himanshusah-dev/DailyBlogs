require('dotenv').config();
const z = require("zod");
const { Router } = require("express")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userModel } = require("./db");
const { userMiddleware } = require("./userMiddleware");

const WebTOKEN_KEY = process.env.JWT_SECRET_TOKEN;

// console.log(WebTOKEN_KEY);

const userRoute = Router();


userRoute.post("/signup", async (req, res) => {
    // console.log(typeof (req.body.name), typeof (req.body.email), typeof (req.body.password))
    const User = z.object({
        name: z.string().min(3, "Name must be at least 3 characters"),
        email: z.string().min(3, "Invalid email format"),
        password: z.string().min(6, "Password must be at least 6 characters"),
    });

    const validateData = User.safeParse(req.body);

    if (!validateData.success) {
        return res.json({
            error: validateData.error,
        })
    }


    const { name, email, password } = req.body;

    const hasePassword = await bcrypt.hash(password, 5);


    try {
        await userModel.create({
            name,
            email,
            password: hasePassword,

        })
        res.json({
            message: "User Created successfully"
        })
    } catch (error) {
        console.log(error);
    }

})




userRoute.post("/signin", async (req, res) => {

    const Data = z.object({
        email: z.string().email().min(4),
        password: z.string().min(4),
    })


    const validate = Data.safeParse(req.body);
    if (!validate.success) {
        console.log(validate.error);
        return res.json({
            message: "invalid input",

        })
    }

    const { email, password } = req.body;

    const findUser = await userModel.findOne({
        email
    })

    const checkPassword = bcrypt.compare(password, findUser.password);

    if (checkPassword) {
        const token = jwt.sign({ id: findUser._id }, WebTOKEN_KEY);
        res.json({

            token: token,

        })
    } else {
        res.json({
            message: "user not exist "
        })
    }

})

userRoute.get("/getuser", userMiddleware, async (req, res) => {
    const userId = req.userId;
    console.log("userId   ", userId);
    const response = await userModel.findOne({ _id: userId })
    if (response) {
        res.json({
            user: response
        })

    } else {
        res.json({
            message: "User not found",
        })
    }

})

userRoute.post("/getBlogCreator", async (req, res) => {
    console.log(req.body);
    const userId = req.body.creatorId;
    console.log("userId   ", userId);
    const response = await userModel.findOne({ _id: userId })
    if (response) {
        res.json({
            user: response
        })

    } else {
        res.json({
            message: "User not found",
        })
    }

})






module.exports = {
    userRoute
}