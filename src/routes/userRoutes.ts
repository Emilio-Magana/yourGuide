const express = require("express");
const router = express.Router();
const app = express();
const {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  updateMe,
  deleteMe,
  getMe,
  uploadUserPhoto,
  resizeUserPhoto,
} = require("./../controllers/userController");
const {
  signup,
  login,
  forgotPassword,
  resetPassword,
  updatePassword,
  protect,
  restrictTo,
} = require("./../controllers/authController");

router.post("/signup", signup);
router.post("/login", login);
router.post("/forgotPassword", forgotPassword);
router.patch("/resetPassword/:token", resetPassword);

// user protected actions
router.use(protect);

router.patch("/updateMyPassword", updatePassword);
router.get("/me", getMe, getUser);
router.patch("/updateMe", uploadUserPhoto, resizeUserPhoto, updateMe);
router.delete("/deleteMe", deleteMe);

// admin restricted actions
router.use(restrictTo("admin"));
router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

app.use("/api/v1/users", router);

module.exports = router;
