const express = require("express");
const app = express();
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// Sample posts
let posts = [
    { id: uuidv4(), username: "Pankhuri", content: "I love Coding" },
    { id: uuidv4(), username: "Aman", content: "I hate Coding" },
    { id: uuidv4(), username: "Stuti", content: "I love sleeping" },
];

// Root redirect to /posts
app.get("/", (req, res) => {
    res.redirect("/posts");
});

// Routes
app.get("/posts", (req, res) => {
    res.render("index", { posts });
});

app.get("/posts/new", (req, res) => {
    res.render("new");
});

app.post("/posts", (req, res) => {
    const { username, content } = req.body;
    const id = uuidv4();
    posts.push({ id, username, content });
    res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
    const post = posts.find(p => p.id === req.params.id);
    if (!post) return res.send("Post not found!");
    res.render("show", { post });
});

app.patch("/posts/:id", (req, res) => {
    const post = posts.find(p => p.id === req.params.id);
    if (post) {
        post.content = req.body.content;
    }
    res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) => {
    const post = posts.find(p => p.id === req.params.id);
    res.render("edit", { post });
});

app.delete("/posts/:id", (req, res) => {
    posts = posts.filter(p => p.id !== req.params.id);
    res.redirect("/posts");
});

// Use dynamic port for Render
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}`));
