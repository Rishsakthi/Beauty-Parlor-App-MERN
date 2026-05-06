const router = require("express").Router();
const multer = require("multer");
const { addAppointment, getAllAppointments } = require("../controller/appointmentController");
const auth = require("../middlewares/authMiddleware");


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
  "/add",auth,
  upload.fields([
    { name: "frontfile", maxCount: 1 },
    { name: "backfile", maxCount: 1 }
  ]),
  addAppointment
);

router.get("/all",auth, getAllAppointments);

module.exports = router;