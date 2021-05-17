const express = require("express");
const app = express();
const posts = require("./posts.json");
const fs = require("fs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//create a new post
app.post("/posts", (req, res) => {
  console.log(req.body.newPost);
  let newPost = req.body.newPost;
  posts.push(req.body.newPost);

  let stringedData = JSON.stringify(posts, null, 2);
  fs.writeFile("posts.json", stringedData, function (err) {
    if (err) {
      return res.status(500).json({ message: err });
    }
  });
  return res.status(200).json({ message: "new user created" });
});

//fetch all posts
app.get("/posts", (req, res) => {

  return res.json({ posts });
});

// get single post with id
app.get("/posts/:id", (req, res) => {
  let id = req.params.id;
  let foundPost = posts.find((post) => {
    return String(post.id) === id;
  });

  if (foundPost) {
    return res.status(200).json({ user: foundPost });
  } else {
    return res.status(404).json({ message: "user not found" });
  }
});

// update a single post by id
app.put("/posts/:id", (req, res) => {
  let id = req.params.id;
} )

app.listen(3000, function () {
  console.log("server is up and running");
});
