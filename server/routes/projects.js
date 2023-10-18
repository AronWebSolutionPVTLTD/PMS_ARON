const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projects');
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
// GET all projects
router.get('/', catchAsyncErrors(projectController.getAllProjects));

router.get('/monthly', catchAsyncErrors(projectController.MonthlyWiseProject));

router.get('/yearly', catchAsyncErrors(projectController.CurrentYearTotalAmount));

router.post('/', catchAsyncErrors(projectController.createProject));

// GET the count of projects
router.get('/count', catchAsyncErrors(projectController.getProjectCount));

// Update a project by ID
router.put('/:id', catchAsyncErrors(projectController.editProject));

// Delete a project by ID
router.delete('/:id', catchAsyncErrors(projectController.deleteProject));

module.exports = router;
