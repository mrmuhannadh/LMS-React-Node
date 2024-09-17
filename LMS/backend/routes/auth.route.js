const express = require("express");
const {
  signUp,
  signIn,
  signOut,
  verifyEmail,
} = require("../controllers/auth.controller");
const router = express.Router();

router.post("/login", signIn);

router.post("/signup", signUp);

router.post("/logout", signOut);

router.post("/verify-email", verifyEmail);

module.exports = router;
