const z = require("zod");

const { Router } = require("express");
const { userMiddleware } = require("./userMiddleware");
const { blogModel } = require("./db");


const blogRoutes = Router();



blogRoutes.post("/content", userMiddleware, async (req, res) => {
    console.log("reach in the add content route");
    const creatorId = req.userId;
    const Data = z.object({
        title: z.string().min(4),
        slug: z.string().min(4),
        content: z.string().min(6),
        tags: z.array(z.string().min(2)),

    })

    const validate = Data.safeParse(req.body);
    if (!validate.success) {
        return res.json({
            error: validate.error,
        })

    }
    const { title, slug, content, tags } = req.body;


    const addcont = await blogModel.create({
        title,
        slug,
        content,
        tags,
        creatorId: creatorId,
    })
    if (addcont) {
        res.json({
            message: "Content added "
        })
    } else {
        res.json({
            message: " erro in add content"
        })

    }
}

)


blogRoutes.get("/content", userMiddleware, async (req, res) => {
    const creatorId = req.userId;
    // console.log(creatorId);
    const findContent = await blogModel.find({ creatorId })

    if (findContent) {
        res.json({
            content: findContent
        })
    } else {
        res.json({
            message: " content not find "
        })
    }

})


blogRoutes.get("/onecontent", userMiddleware, async (req, res) => {
    const userId = req.userId;
console.log()
    const contentId = req.query.contentId;

    const findContent = await blogModel.findOne({ _id: contentId })
    console.log("the content", findContent);

    if (findContent) {
        res.json({
            content: findContent
        })
    } else {
        res.json({
            message: " content not find "
        })
    }

})


blogRoutes.get("/allblogs", async (req, res) => {
    try {

        const blogs = await blogModel.find(); // no condition → all blogs

        res.status(200).json(blogs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching blogs" });
    }
});


// blogRoutes.put("/update", userMiddleware, async (req, res) => {
//     console.log("body component", req.body);
//     console.log("headers of : ", req.headers);

//     const userId = req.userId;
//     const { contentId, title, slug, content, tags } = req.body;

//     if (!contentId) {
//         return res.status(400).json({ message: "Content ID is required" });
//     }
//     const updatedBlog = await blogModel.findOneAndUpdate(
//         { _id: contentId, creatorId: userId },
//         {
//             $set: { title: title, slug: slug, content: content, tags: tags },
//             $currentDate: { lastModified: true }
//         },
//         { new: true }
//     );


// })


blogRoutes.put("/update", userMiddleware, async (req, res) => {
    try {
        console.log("Body content:", req.body);
        console.log("Headers:", req.headers);

        const userId = req.userId;
        const { contentId, title, slug, content, tags } = req.body;

        if (!contentId) {
            return res.status(400).json({ message: "Content ID is required" });
        }

        const updatedBlog = await blogModel.findOneAndUpdate(
            { _id: contentId, creatorId: userId },
            {
                $set: { title, slug, content, tags },
                $currentDate: { lastModified: true },
            },
            { new: true }
        );

        if (!updatedBlog) {
            return res.status(404).json({ message: "Blog not found or unauthorized" });
        }

        res.status(200).json({
            success: true,
            message: "Blog updated successfully",
            updatedBlog,
        });
    } catch (err) {
        console.error("Update error:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
});



module.exports = {
    blogRoutes
}
