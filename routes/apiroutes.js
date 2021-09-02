const express = require('express');
const router = express.Router();
const Blog = require('../models/blogModel');
const colors = require('colors');

router.get('/blogs', async(req, res) => {
    const listBlogs = await Blog.find();
    res.render('../views/blogs.ejs', {blogs : listBlogs});
});
router.get('/blogs/create', (req, res) => {
    res.render('../views/create.ejs');
})
router.put('/blogs/:id', async(req, res) => {
    try {
        await Blog.findByIdAndUpdate(req.params.id, req.body);
        res.send("Okay updated");
    } catch(err) {
        res.send("Couldn't update!");
    }
});
router.delete('/blogs/:id', async(req, res) => {
    try {
        await Blog.findByIdAndDelete(req.params.id, req.body);
        res.send("Okay Deleted");
    } catch(err) {
        res.send("Couldn't delete");
    }
});
router.get('/blogs/:id', async(req, res) => {
    const blog = await Blog.findById(req.params.id);
    if(blog) {
        res.render('blog.ejs', {blog});
    } else {
        res.send("Couldn't find the required blog");
    }
});

router.post('/blogs', async(req, res) => {

    console.log("Hit the right route".green);
    console.log(req.body);
    const blog = new Blog({...req.body});
    await blog.save();
    res.send("Created a new Blog post");
});

module.exports = router;