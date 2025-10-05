const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const {v4: uuidv4} = require('uuid');
uuidv4();
const methodOverride= require("method-override");


app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
let posts = [
    {
        id:uuidv4(),
        username : "Pankhuri",
        content : "I love Coding"
    },
    {
        id:uuidv4(),
        username : "Aman",
        content : "I hate Coding"
    },
    {
        id:uuidv4(),
        username : "Stuti",
        content : "I love sleeping"
    },
];
app.get("/posts", (req,res) => {
    res.render("index",{posts});
});

app.get("/posts/new" , (req, res) =>{
    
    res.render("new");
});

app.post("/posts", (req,res) => {
    let {username, content} = req.body;
    let id = uuidv4();
    posts.push({id,username, content});
    res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
    const id = (req.params.id);
    const post = posts.find(p => p.id === id); // find by unique ID

    if (!post) {
        return res.send("Post not found!");
    }

    res.render("show", { post });
});

app.patch("/posts/:id", (req,res) =>{
    const id = (req.params.id);
    let newContent = req.body.content;
    const post = posts.find(p => p.id === id);
    post.content = newContent;
    console.log(post);
    res.redirect("/posts");
});
app.get("/posts/:id/edit", (req,res)=>{
    const id = (req.params.id);
    const post = posts.find(p => p.id === id);
    res.render("edit.ejs",{post});
});
app.delete("/posts/:id", (req,res) =>{
    let {id} = req.params;
    posts = posts.filter(p => p.id !== id);
    res.redirect("/posts");
})
app.listen(port ,() => {
    console.log("Listening to port : 8080")
});