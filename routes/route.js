const express = require("express");
const router = express.Router();
const { register_admin, admin_login } = require("../controllers/admin");
const { add_hostel, pending_hostel } = require("../controllers/hostel");
const { register_user, user_login } = require("../controllers/user");

//admin  routes
const registeradmin = router.post("/newadmin", register_admin);
const loginadmin = router.post("/admin", admin_login);

//user routes
const registeruser = router.post("/newuser", register_user);
const loginuser = router.post("/user", user_login);

//routes for hostels
const addhostel = router.post("/newhostel", add_hostel);
const pendinghostel = router.get("/pendinghostel", pending_hostel);

module.exports = {
  addhostel,
  registeradmin,
  registeruser,
  loginadmin,
  loginuser,
  pendinghostel,
};
