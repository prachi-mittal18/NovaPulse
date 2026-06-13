const { Signup, Login, Logout } = require("../Controllers/AuthController");
const { UserModel } = require("../model/UserModel");
const bcrypt = require("bcryptjs");
const { userVerification } = require("../Middlewares/AuthMiddleware");
const router = require("express").Router();

router.post("/signup", Signup);
router.post("/login", Login);
router.post("/verify", userVerification, async (req, res) => {
  try {
    // Re-fetch the user from the database to ensure we have the latest tradingPin status
    const user = await UserModel.findById(req.user.id);
    res.status(200).json({ 
      status: true, 
      user: user.username, 
      email: user.email,
      hasTradingPin: !!user.tradingPin 
    });
  } catch (err) {
    res.status(500).json({ status: false, message: "Verification failed" });
  }
});
router.post("/logout", Logout);

/**
 * Set or Update Trading PIN
 */
router.post("/set-pin", userVerification, async (req, res) => {
  try {
    const { pin } = req.body;
    if (!pin || pin.length < 4) return res.status(400).json({ message: "PIN must be at least 4 digits" });
    
    // Hash the PIN before saving to the database
    const hashedPin = await bcrypt.hash(pin, 12);

    // Use findByIdAndUpdate to ensure the field is set even if the model instance is stale
    await UserModel.findByIdAndUpdate(req.user.id, { 
      $set: { tradingPin: hashedPin } 
    });

    res.status(200).json({ message: "Trading PIN set successfully", success: true });
  } catch (err) {
    res.status(500).json({ message: "Error setting PIN", success: false });
  }
});

module.exports = router;
