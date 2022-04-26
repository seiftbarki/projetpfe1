const router = require("express").Router();
const Profile = require("../models/Profile");
const verifyToken = require("../middlewares/verifyToken");
const User = require("../models/User");

router.post("/profile", verifyToken, async (req, res) => {
  const { bio, age } = req.body;
  try {
    let profile = await Profile.findOne({ user: req.user._id });

    if (!profile) {
      let profile = await Profile.create({
        bio,
        age,
      });
      res
        .status(200)
        .json({ status: true, msg: "Profile created", data: profile });
    } else {
      res.status(400).json({ status: true, msg: "Profile exists" });
    }
  } catch (err) {
    res.status(500).json({ status: false, msg: err });
  }
});
router.put("/profile/:id", verifyToken, async (req, res) => {
  const { bio, age } = req.body;
  try {
    let { id } = req.params;
    console.log(id);
    let profile = await Profile.findOne({
      user: req.user._id,
    });
    if (profile) {
      let profile = await Profile.findOneAndUpdate(
        { id },
        { ...req.body },
        { new: true }
      );
      return res.status(200).json({
        status: true,
        msg: "Profile updated successfully!!",
        data: profile,
      });
    } else {
      return res.status(400).json({ status: true, msg: "Not allowed!!" });
    }
  } catch (err) {
    res.status(500).json({ status: false, msg: err });
  }
});
router.delete("/deleteprofile/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const Deletedprofile = await Profile.findByIdAndDelete(id);
    res.status(200).json({
      status: true,
      message: "profile Deleted .. !",
      data: Deletedprofile,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: false, message: err });
  }
});

module.exports = router;
