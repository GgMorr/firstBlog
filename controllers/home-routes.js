// CONTAINS ALL USER-FACING ROUTES (Eg. Home & Login pages)
const router = require('express').Router();
//const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');


 // Get all posts 
 router.get("/", (req, res) => {
  Post.findAll({
    include: [User],
  })
    .then((dbPostData) => {
      const posts = dbPostData.map((post) => post.get({ plain: true }));

      res.render("all-posts", { posts, loggedIn: req.session.loggedIn });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// Get single post
router.get("/post/:id", (req, res) => {
  Post.findByPk(req.params.id, {
    include: [
      User,
      {
        model: Comment,
        include: [User],
      },
    ],
  })
    .then((dbPostData) => {
      if (dbPostData) {
        const post = dbPostData.get({ plain: true });

        res.render("single-post", { post });
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("signup");
});

module.exports = router;