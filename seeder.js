const mongoose = require('mongoose')
const Blog = require('./models/blogModel')


async function main() {
    await mongoose.connect('mongodb://localhost:27017/blogwebsite')
}


const blogs = [
    {
        title : "Trees",
        author: "Peter",
        text: "Hidden Leaf"
    },
    {
        title : "Krsna",
        author: "Prabhupada",
        text: "krishna"
    }
]
const seed = async() => {
    try {
        await(main());
        console.log("Connected to mongoDB");
        await Blog.insertMany(blogs);
        console.log("seeded");
        process.exit(0);
    } catch(err) {
        console.log(err);
    }
}

seed();

//seed();