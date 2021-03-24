const express = require('express');
const router = express.Router();
//const passport = require('passport');
//const catchAsync = require('../utils/catchAsync');
//const User = require('../models/user');
//const users = require('../controllers/users');

// const about = require('../controllers/about');
// const catchAsync = require('../utils/catchAsync');
// const { isLoggedIn, isAuthor, validateGround } = require('../middleware');
// const multer = require('multer');
// const { storage } = require('../cloudinary');
// const upload = multer({ storage });

// const Ground = require('../models/ground');

router.route('/')
    .get(catchAsync(grounds.index))
    .post(isLoggedIn, upload.array('image'), validateGround, catchAsync(grounds.createGround))


router.get('/new', isLoggedIn, grounds.renderNewForm)

router.route('/:id')
    .get(catchAsync(grounds.showGround))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateGround, catchAsync(grounds.updateGround))
    .delete(isLoggedIn, isAuthor, catchAsync(grounds.deleteGround));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(grounds.renderEditForm))



module.exports = router;
