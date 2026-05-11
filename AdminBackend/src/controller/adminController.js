const Appointment = require("../models/appointmentModel");
const User=require("../models/userModel")


const frequentCustomers = async (req, res) => {
  const data = await Appointment.aggregate([
    {
      $group: {
        _id: "$city",
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
        _id: {
          city: "$city",
          service: "$service"
        },
        count: { $sum: 1 }
      }
    },
    { $sort: { count: -1 } }
  ]);
  res.json(data);
};

const getUsers = async (req, res) => {
  try{
  const users = await User.find( {isDeleted: false}).select("-password");



  res.json(users);
  }
  catch(err){
    console.log(err)
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, {
      isDeleted: true
    });
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.log(err);
  }
};
const dashboardStats = async (req, res) => {
  try {
    const bookingCount = await Appointment.countDocuments();

    const customerCount = await Appointment.distinct("phone");

    const userCount = await User.countDocuments();

    const admin = await User.findById(req.user.id);


    res.json({
      bookings: bookingCount,
      customers: customerCount.length,
      users: userCount,
      adminName:admin.username
 
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { frequentCustomers, topServices, getUsers, deleteUser, dashboardStats };