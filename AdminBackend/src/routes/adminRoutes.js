const router = require("express").Router();
const auth = require("../middlewares/authMiddleware");
const role = require("../middlewares/roleMiddleware");

const {
  frequentCustomers,
  topServices,getUsers,deleteUser,
  dashboardStats
} = require("../controller/adminController");

router.get("/frequent", auth, role("admin"), frequentCustomers);
router.get("/top-services", auth, role("admin"), topServices);
router.get("/users", auth,role("admin"), getUsers);
router.delete("/users/:id", auth,role("admin"), deleteUser);
router.get("/dashboardstats/:id",auth,role("admin"),dashboardStats)
module.exports = router;