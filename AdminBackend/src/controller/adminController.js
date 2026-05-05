const Appointment = require("../models/appointmentModel");


const frequentCustomers = async (req, res) => {
  const data = await Appointment.aggregate([
    {
      $group: {
        _id: "$phone",
        name: { $first: "$name" },
        visits: { $sum: 1 }
      }
    },
    { $sort: { visits: -1 } }
  ]);

  res.json(data);
};

const topServices = async (req, res) => {
  const data = await Appointment.aggregate([
    { $unwind: "$service" },
    {
      $group: {
        _id: "$service",
        count: { $sum: 1 }
      }
    },
    { $sort: { count: -1 } }
  ]);

  res.json(data);
};

module.exports = { frequentCustomers, topServices };