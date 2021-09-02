const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const Blog = require('./models/blogModel')
const apiRoutes = require('./routes/apiroutes');
const colors = require('colors')
const methodOverride = require('method-override');

main()
    .then(() => console.log("Connected to mongoDB"))
    .catch(_err => console.log("Mongoose couldn't connect"))

async function main() {
    await mongoose.connect('mongodb://localhost:27017/blogwebsite', {
    });
}
app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use('/api', apiRoutes);

app.listen(port, () => {
    console.log("Listening at port number 3000")
});

