const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require("../models/");
const withAuth = require("../utils/auth");

// ORIGINAL
 router.get("/", withAuth, (req, res) => {
  Post.findAll({
    where: {
      userId: req.session.userId
    }
  })
    .then(dbPostData => {
      const posts = dbPostData.map((post) => post.get({ plain: true }));

      res.render("dashboard", {
        posts
      });
    })
    .catch(err => {
      console.log(err);
      res.redirect("login");
    });
});

// ////NEWLY ADDED
// router.get("/", withAuth, (req, res) => {
//   Post.findAll({
//     where: {
//       userId: req.session.userId
//     },
//     attributes: [
//       'id',
//       'post_url',
//       'title',
//       'created_at',
//     ],
//     include: [
//       {
//         model: Comment,
//         attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
//         include: {
//           model: User,
//           attributes: ['username']
//         }
//       },
//       {
//         model: User,
//         attributes: ['username']
//       }
//     ]
//   })
//     .then(dbPostData => {
//       const posts = dbPostData.map((post) => post.get({ plain: true }));

//       res.render("dashboard", {
//         posts,
//         loggedIn: true
//       });
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });
// //// END OF NEWLY ADDED


router.get("/new", withAuth, (req, res) => {
  res.render("new-post", {
    layout: "dashboard"
  });
});

router.get("/edit/:id", withAuth, (req, res) => {
  Post.findByPk(req.params.id)
    .then(dbPostData => {
      if (dbPostData) {
        const post = dbPostData.get({ plain: true });

        res.render("edit-post", {
          layout: "dashboard",
          post
        });
      } else {
        res.status(404).end();
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;