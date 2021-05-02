const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// get all posts
router.get('/', (req, res) => {
  console.log('======================');
  Post.findAll({
    order: [['createdAt', 'DESC']],
    attributes: [
      'id',
      'body',
      'title',
      'createdAt'
      
      
    ],
    order: [['createdAt', 'DESC']],
    include: [
      {
        model: Comment,
        attributes: ['id', 'body', 'post_id', 'user_id', 'createdAt'],
        
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData =>
      console.log(dbPostData)
      )
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'title',
       'body',
      'createdAt'
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'body', 'post_id', 'createdAt'],
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
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});





router.post('/', withAuth, (req, res) => {
  // expects {title: 'Taskmaster goes public: 'https://taskmaster.com/press', user_id: 1}
  Post.create({
    title: req.body.title,
    user_id: req.session.user_id
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});



router.put('/edit/:id', withAuth, (req, res) => {
  Post.update(req.body,
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(dbPostData => {
      if(dbPostData > 0){
        req.status(200).end();
      } else {
        res.status(404).end();
      }
     
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
     res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
router.delete('/:id', withAuth, (req, res) => {
  console.log('id', req.params.id);
  Post.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;

