
// const router = require('express').Router();
// const { Comment } = require('../../models');

const router = require("express").Router();
const { Comment } = require("../../models/");
// const withAuth = require("../../utils/auth");

router.post("/", (req, res) => {
  Comment.create({ ...req.body, userId: req.session.userId })
    .then(dbCommentData => {
      res.json(dbCommentData);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});





router.get('/', (req, res) => {
  Comment.findAll()
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  // expects => {comment_text: "This is the comment", user_id: 1, post_id: 2}
  if (req.session) {
    Comment.create({
      comment_text: req.body.comment_text,
      user_id: req.session.user_id,
      post_id: req.body.post_id
    })
      .then(dbCommentData => res.json(dbCommentData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  }
});

router.delete('/:id', (req, res) => {
  if (req.session) {
    Comment.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbCommentData => {
        if (!dbCommentData) {
          res.status(404).json({ message: 'No comment found with this id!' });
          return;
        }
        res.json(dbCommentData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  }
});

module.exports = router;

// module.exports = router;







// const router = require("express").Router();
// const { Comment } = require("../../models/");
// const withAuth = require("../../utils/auth");

// router.post("/", withAuth, (req, res) => {
//   Comment.create({ ...req.body, userId: req.session.userId })
//     .then(newComment => {
//       res.json(newComment);
//     })
//     .catch(err => {
//       res.status(500).json(err);
//     });
// });
// module.exports = router;