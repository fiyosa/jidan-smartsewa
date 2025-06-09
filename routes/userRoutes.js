const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/users/with-room', userController.getUsersWithRoom); 
router.get('/users/:id', userController.getUserById);             
router.get('/users', userController.getAllUsers);
router.put('/users/:id', userController.updateUserRoom);
router.put('/profile', userController.updateProfile); 
router.delete('/users/:id', userController.deleteUser);

module.exports = router;
