const express = require('express');
const router = express.Router();
const { getUsers, createUser, getUserByID } = require('../controllers/userController');
const { isAuthenticated, isAuthorized } = require('../middleware/auth');

router.get('/',isAuthenticated, isAuthorized(['admin']) , getUsers);
router.get('/:id', getUserByID);
router.post('/', createUser);


module.exports = router;
