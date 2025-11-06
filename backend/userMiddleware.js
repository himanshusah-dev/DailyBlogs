const WebTOKEN_KEY = process.env.JWT_SECRET_TOKEN;
const jwt = require("jsonwebtoken");

function userMiddleware(req, res, next) {
    console.log(req.headers);
    const token = req.headers.authorization;
    // console.log("token in the middleware : ", token);
    // console.log("webtoken key===", WebTOKEN_KEY)
    // console.log("reach at middeleware \n");


    const validate = jwt.verify(token, WebTOKEN_KEY);
    // console.log("the valid id ==", validate.id);

    if (validate) {

        req.userId = validate.id;

        next();
    } else {
        res.json({
            message: "user not found",
        })
    }



}
module.exports = {
    userMiddleware
}