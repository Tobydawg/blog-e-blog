const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// get all posts for dashboard
router.get('/', withAuth, (req, res) => {
  console.log(req.session);
  console.log('======================all dashboard posts');
  Post.findAll({
    where: {
      user_id: req.session.user_id
      
    },
    attributes: [
      'id',
      'body',
      'title',
      'createdAt'
      
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'post_id', 'user_id', 'createdAt'],
        
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      const posts = dbPostData.map(post => post.get({ plain: true }));
      console.log(posts)
      res.render('all-post', {layout:"dashboard", posts });
    })
    .catch(err => {
      console.log(err);
    //   res.status(500).json(err);
      res.redirect('dashboard');
    });
});

router.get('/edit/:id', withAuth, (req, res) => {
  Post.findByPk(req.params.id, {
    attributes: [
      'id',
      'body',
      'title',
      'createdAt'
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'body', 'post_id', 'user_id', 'createdAt'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      if (dbPostData) {
        const post = dbPostData.get({ plain: true });
        
        res.render('edit-post', {
          post,
          loggedIn: true
        });
      } else {
        res.status(404).end();
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get("/new", withAuth, (req, res) => {
  console.log("=================== are you the one we are looking for? ===============")
    res.render("edit-post", {
      layout: "dashboard"
    });
  });

router.get('post/:id', (req, res) => {
  console.log('line 91');
  Post.findByPk(req.params.id, {
    include: [
      User,
      {
        model: Comment,
        include: [User],
      },
    ],
  })
  .then(post=>{
    console.log('line 94')
    console.log(post)
    if (post)
    {
      res.render("single-post", {
        post,
        loggedIn: true
      })
    }
  })
})

module.exports = router;

