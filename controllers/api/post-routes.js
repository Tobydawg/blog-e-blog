const router = require("express").Router();
const sequelize = require("../../config/connection");
const { Post, User, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// get all posts
router.get("/all", (req, res) => {
  console.log("======================line 8");
  Post.findAll({
    order: [["createdAt", "DESC"]],
    attributes: ["id", "body", "title", "createdAt"],
    order: [["createdAt", "DESC"]],
    include: [
      {
        model: Comment,
        attributes: ["id", "body", "post_id", "user_id", "createdAt"],
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPostData) => {
      console.log(dbPostData);
      return res.status(200).json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  console.log("=================line35")
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "title", "body", "createdAt"],
    include: [
      {
        model: Comment,
        attributes: ["id", "body", "post_id", "createdAt"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPostData) => {
      console.log("Got ===========================this far");
      if (!dbPostData) {
        console.log("I'm failing to find one post....");
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      console.log("line 72-----------------------", dbPostData);
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", withAuth, (req, res) => {
  console.log("===============================line72 post routes")
  Post.create({
    title: req.body.title,
    user_id: req.session.user_id,
    post_url: req.body.post_url,
    //body: req.body.body
  })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put("/edit/:id", withAuth, (req, res) => {
  console.log("=======================================is this the route on line 87")
  Post.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((dbPostData) => {
      if (dbPostData > 0) {
        req.status(200).end();
      } else {
        res.status(404).end();
      }

      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
router.delete("/:id", withAuth, (req, res) => {
  console.log("id", req.params.id);
  Post.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
