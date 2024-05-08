const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');


router.get('/', taskController.getAllTasks);
router.post('/', taskController.createTask);
router.put('/:id', taskController.editTask);
router.put('/:id/userEdit', taskController.userEdit)


module.exports = router;
