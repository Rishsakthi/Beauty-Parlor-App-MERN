const router = require("express").Router();
const multer = require("multer");
const { addAppointment, getAllAppointments } = require("../controller/appointmentController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });


router.post(
  "/add",
  upload.fields([
    { name: "frontfile", maxCount: 1 },
    { name: "backfile", maxCount: 1 }
  ]),
  addAppointment
);

router.get("/all", getAllAppointments);

module.exports = router;