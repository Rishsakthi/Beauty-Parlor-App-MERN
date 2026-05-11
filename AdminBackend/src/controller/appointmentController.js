const Appointment = require("../models/appointmentModel");

const addAppointment = async (req, res) => {
  try {
      console.log(req.user)
      console.log(req.user.id)

    const {
      name,
      phone,
      email,
      service,
      city,
      appointmentdate,
      occasion,
      timeslot
    } = req.body;

    const selectedDate = new Date(appointmentdate);
      selectedDate.setHours(0, 0, 0, 0);
      const nextDay = new Date(selectedDate);
      nextDay.setDate(nextDay.getDate() + 1);
      const existingBookings = await Appointment.countDocuments({
        appointmentdate: {
          $gte: selectedDate,
          $lt: nextDay
        },
        timeslot: timeslot
      });
     if (existingBookings > 5) {
      return res.status(400).json({
        message: "This time slot is already full for the selected day"
      });
    }
    const frontimage = req.files?.frontfile?.[0]?.filename || null;
    const backimage = req.files?.backfile?.[0]?.filename || null;
      let parsedService = [];
      try {
        if (typeof service === "string") {
          parsedService = JSON.parse(service);
        } else if (Array.isArray(service)) {
          parsedService = service;
        } else if (service) {
          parsedService = [service]; 
        }
      } catch {
        parsedService = [service];
      }

      const parsedDate = new Date(appointmentdate);
      const leaveDate=[new Date("2026-06-01"),new Date("2026-07-01"),new Date("2026-08-01"),
        new Date("2026-09-01"),new Date("2026-10-01")
      ];
        for(const d of leaveDate){
            if(parsedDate.toDateString()===d.toDateString()){
              return res.status(400).json({message:"This Date is not available"});
            }
        }
        if (isNaN(parsedDate)) {
          return res.status(400).json({ message: "Invalid appointment date" });
        }

    const newAppointment = new Appointment({
      name,
      phone,
      email,
      service: parsedService,
      appointmentdate: parsedDate,
      occasion,
      frontimage,
      city,
      backimage,
      timeslot,
      userId: req.user.id

    });

    await newAppointment.save();

    res.status(201).json({
      message: "Appointment saved successfully"
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error saving appointment" });
  }
};
const getAllAppointments = async (req, res) => {
  try {
    const data = await Appointment.find().sort({ createdAt: 1 });
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fetching appointments" });
  }
};

const getMyBookings = async (req, res) => {
  try {
    const data = await Appointment.find({
      userId: req.user.id
    });

    res.status(200).json(data);

  } catch (err) {

    res.status(500).json({
      message: "Error fetching bookings"
    });

  }
};
const deleteBooking = async (req, res) => {

  try {

    await Appointment.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Booking cancelled"
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Error deleting booking"
    });

  }

};

module.exports = { addAppointment,getAllAppointments,getMyBookings,deleteBooking };