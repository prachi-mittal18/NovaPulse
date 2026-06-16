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
    
    // Convert to string and trim whitespace
    const pinString = String(pin).trim();
    
    if (!pinString || pinString.length < 4) {
      return res.status(400).json({ message: "PIN must be at least 4 digits", success: false });
    }
    
    console.log(`[SET_PIN] User: ${req.user.id} | PIN received: "${pinString}" | Type: ${typeof pinString} | Length: ${pinString.length}`);
    
    // Hash the PIN before saving to the database
    const hashedPin = await bcrypt.hash(pinString, 12);
    console.log(`[SET_PIN] Hash generated successfully | Hash length: ${hashedPin.length}`);

    // Use findByIdAndUpdate to ensure the field is set even if the model instance is stale
    await UserModel.findByIdAndUpdate(req.user.id, { 
      $set: { tradingPin: hashedPin } 
    });

    console.log(`[SET_PIN] Trading PIN saved to database for user: ${req.user.id}`);
    res.status(200).json({ message: "Trading PIN set successfully", success: true });
  } catch (err) {
    console.error(`[SET_PIN] Error:`, err);
    res.status(500).json({ message: "Error setting PIN", success: false });
  }
});

module.exports = router;
