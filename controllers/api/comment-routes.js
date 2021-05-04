 
 const router = require('express').Router();
 const { Comment } = require('../../models');
 const withAuth = require('../../utils/auth');
 
 router.get('/all', (req, res) => {
   Comment.findAll()
     .then(dbCommentData => res.json(dbCommentData))
     .catch(err => {
       console.log(err);
       res.status(500).json(err);
     });
 });
 
      
  
  //comments/
  router.post('/', withAuth, (req, res) => {
    console.log(req.body);
    Comment.create({
      // title: req.body.title,
      body: req.body.body,
      
      // comment: req.body.comment,
      
      user_id: req.session.user_id,
      post_id: req.body.post_id,
      
    })
      .then(dbCommentData => {
        console.log(dbCommentData)
      return res.json(dbCommentData)
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  });
  
  router.delete('/:id', withAuth, (req, res) => {
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
  });
  
  module.exports = router;
  
  
  