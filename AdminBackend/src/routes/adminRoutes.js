const router = require("express").Router();
const auth = require("../middlewares/authMiddleware");
const role = require("../middlewares/roleMiddleware");

const {
  frequentCustomers,
  topServices
} = require("../controller/adminController");

router.get("/frequent", auth, role("admin"), frequentCustomers);
router.get("/top-services", auth, role("admin"), topServices);

module.exports = router;