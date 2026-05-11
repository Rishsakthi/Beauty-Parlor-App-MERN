const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  service: [String],
  appointmentdate: Date,
  occasion: String,
  frontimage: String,
  backimage: String,
  city: String,
  appointmentdate: Date, 
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  timeslot: String
  
});

module.exports = mongoose.model("Appointment", appointmentSchema);