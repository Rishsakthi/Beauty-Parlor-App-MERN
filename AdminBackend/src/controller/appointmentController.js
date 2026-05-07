const Appointment = require("../models/appointmentModel");

const addAppointment = async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      service,
      appointmentdate,
      occasion
    } = req.body;

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
      backimage
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


module.exports = { addAppointment,getAllAppointments };