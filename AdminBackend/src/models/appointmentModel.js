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
  appointmentdate: Date, 
});

module.exports = mongoose.model("Appointment", appointmentSchema);