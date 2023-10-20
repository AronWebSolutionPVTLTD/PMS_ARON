const Project = require('../model/project');

// Get all projects
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .sort({ createdAt: -1 })
      .populate('client', 'first_name last_name')
      .populate('users', 'username department');

    // Iterate through each project to count pending milestones
    const projectsWithPendingMilestones = projects.map((project) => {
      const pendingMilestones = project.milestones.filter((milestone) => !milestone.completed);

      // Calculate the total amount of pending milestones
      const pendingAmount = pendingMilestones.reduce((total, milestone) => total + milestone.amount, 0);

      // Calculate the amount of completed milestones
      const completedMilestones = project.milestones.filter((milestone) => milestone.completed);

      const recievedAmount = completedMilestones.reduce((total, milestone) => total + milestone.amount, 0);
      // Calculate the remaining contract value
      const remainingContractValue = project.contractValue - completedMilestones.reduce((total, milestone) => total + milestone.amount, 0);

      return {
        ...project._doc,
        pendingMilestonesCount: pendingMilestones.length,
        pendingAmount: pendingAmount,
        recievedAmount,
        remainingContractValue: remainingContractValue >=0 ?remainingContractValue:0,
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


// API endpoint to get monthly milestone data
exports.MonthlyWiseProject = async (req, res) => {
  try {
    const data = await getMonthlyMilestoneData();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}

// Function to calculate monthly milestone data based on project createdAt timestamps
async function getMonthlyMilestoneData() {
  const currentDate = new Date();
  const sixMonthsAgo = new Date(currentDate);
  sixMonthsAgo.setMonth(currentDate.getMonth() - 6); // Calculate the date six months ago

  const pipeline = [
    {
      $match: {
        "createdAt": { $gte: sixMonthsAgo, $lte: currentDate },
      },
    },
    {
      $unwind: "$milestones", // Split the milestones array into separate documents
    },
    {
      $match: {
        "milestones.completed": true,
      },
    },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        totalAmount: { $sum: "$milestones.amount" },
      },
    },
    {
      $sort: { "_id.year": 1, "_id.month": 1 }, // Sort by year and month in ascending order
    },
  ];

  const result = await Project.aggregate(pipeline);

  // Transform the result to the format you want (name: 'Month Year', uv: totalAmount)
  const monthlyData = result.map((item) => ({
    name: `${getMonthName(item._id.month)} ${item._id.year}`,
    uv: item.totalAmount,
  }));

  return monthlyData;
}

function getMonthName(monthNumber) {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return months[monthNumber - 1];
}


// exports.CurrentYearTotalAmount = async (req, res) => {
//   try {
//     const data = await getCurrentYearTotalAmount();
//     res.json(data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// }

// // Function to calculate the current year's total milestone amount based on project createdAt timestamps
// async function getCurrentYearTotalAmount() {
//   const currentDate = new Date();
//   const currentYear = currentDate.getFullYear();

//   const pipeline = [
//     {
//       $match: {
//         "createdAt": { $gte: new Date(`${currentYear}-01-01T00:00:00.000Z`), $lte: currentDate },
//       },
//     },
//     {
//       $unwind: "$milestones", // Split the milestones array into separate documents
//     },
//     {
//       $match: {
//         "milestones.completed": true,
//       },
//     },
//     {
//       $group: {
//         _id: null,
//         totalAmount: { $sum: "$milestones.amount" },
//       },
//     },
//   ];

//   const result = await Project.aggregate(pipeline);

//   // The result contains a single document with the totalAmount for the current year
//   if (result.length > 0) {
//     return { totalAmount: result[0].totalAmount };
//   } else {
//     return { totalAmount: 0 };
//   }
// }

exports.CurrentYearTotalAmount = async (req, res) => {
  try {
    const [currentYearTotalAmount, currentYearPendingAmount] = await Promise.all([
      getCurrentYearTotalAmount(),
      getCurrentYearPendingAmount()
    ]);
    
    res.json({ currentYearTotalAmount, currentYearPendingAmount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}

// Function to calculate the current year's total milestone amount based on project createdAt timestamps
exports.CurrentYearTotalAmount = async (req, res) => {
  try {
    const currentYearTotalAmount = await getCurrentYearTotalAmount();
    const currentYearContractValue = await getCurrentYearContractValue();
    
    const currentYearPendingAmount = currentYearContractValue - currentYearTotalAmount;
    
    res.json({ currentYearTotalAmount, currentYearPendingAmount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}

// Function to calculate the current year's total milestone amount based on project createdAt timestamps
async function getCurrentYearTotalAmount() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  const pipeline = [
    {
      $match: {
        "createdAt": { $gte: new Date(`${currentYear}-01-01T00:00:00.000Z`), $lte: currentDate },
      },
    },
    {
      $unwind: "$milestones", // Split the milestones array into separate documents
    },
    {
      $match: {
        "milestones.completed": true,
      },
    },
    {
      $group: {
        _id: null,
        totalAmount: { $sum: "$milestones.amount" },
      },
    },
  ];

  const result = await Project.aggregate(pipeline);

  // The result contains a single document with the totalAmount for the current year
  if (result.length > 0) {
    return result[0].totalAmount;
  } else {
    return 0;
  }
}

// Function to calculate the current year's total contract value
async function getCurrentYearContractValue() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  const pipeline = [
    {
      $match: {
        "createdAt": {
          $gte: new Date(`${currentYear}-01-01T00:00:00.000Z`),
          $lte: currentDate,
        },"status": { $ne: "blocked" }
      },
    },
    {
      $addFields: {
        contractValueDouble: { $toDouble: "$contractValue" }, 
      },
    },
    {
      $group: {
        _id: null,
        totalContractValue: { $sum: "$contractValueDouble" }, 
      },
    },
  ];
  

  const result = await Project.aggregate(pipeline);

  if (result.length > 0) {
    return result[0].totalContractValue;
  } else {
    return 0;
  }
}

