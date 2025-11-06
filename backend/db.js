const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;
mongoose.connect("mongodb://localhost:27017/YourBlog")

const userSchema = new Schema({
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
}, { timestamps: true })

const blogSchema = new Schema({
    title: String,
    slug: String,
    content: String,
    tags: [String],
    creatorId: ObjectId,

}, { timestamps: true })



const userModel = mongoose.model("User", userSchema);
const blogModel = mongoose.model("Blog", blogSchema);

module.exports = {
    userModel,
    blogModel,

}