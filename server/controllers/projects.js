const Project = require('../model/project');

// Get all projects
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .sort({ createdAt: -1 })
      .populate('client', 'first_name last_name')
      .populate('users', 'username');

    // Iterate through each project to count pending milestones
    const projectsWithPendingMilestones = projects.map((project) => {
      const pendingMilestones = project.milestones.filter((milestone) => !milestone.completed);

      // Calculate the total amount of pending milestones
      const pendingAmount = pendingMilestones.reduce((total, milestone) => total + milestone.amount, 0);

      // Calculate the amount of completed milestones
      const completedMilestones = project.milestones.filter((milestone) => milestone.completed);

      // Calculate the remaining contract value
      const remainingContractValue = project.contractValue - completedMilestones.reduce((total, milestone) => total + milestone.amount, 0);

      return {
        ...project._doc,
        pendingMilestonesCount: pendingMilestones.length,
        pendingAmount: pendingAmount,
        remainingContractValue: remainingContractValue,
      };
    });

    res.json(projectsWithPendingMilestones);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// exports.getAllProjects = async (req, res) => {
//   try {
//     const projects = await Project.find()
//       .sort({ createdAt: -1 })
//       .populate('client', 'first_name last_name')
//       .populate('users', 'username');

//     const projectsWithPendingMilestones = projects.map((project) => {
//       const pendingMilestones = project.milestones.filter((milestone) => !milestone.completed);
//       const pendingAmount = pendingMilestones.reduce((total, milestone) => total + milestone.amount, 0);
//       return {
//         ...project._doc,
//         pendingMilestonesCount: pendingMilestones.length,
//         pendingAmount: pendingAmount,
//       };
//     });

//     res.json(projectsWithPendingMilestones);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server Error' });
//   }
// };





// Get the count of projects
exports.getProjectCount = async (req, res) => {
  try {
    const count = await Project.countDocuments();
    res.json({ count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update a project by ID
exports.editProject = async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body, // Assuming the request body contains the updated project data
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(updatedProject);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.createProject = async (req, res) => {
  try {
    const newClient = new Project(req.body);
    const savedClient = await newClient.save();
    res.json(savedClient);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete a project by ID
exports.deleteProject = async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndRemove(req.params.id);

    if (!deletedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(deletedProject);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};
