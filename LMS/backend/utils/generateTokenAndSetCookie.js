const jwt = require("jsonwebtoken");

const generateTokenAndSetCookie = (res, userId) => {
  try {
    console.log(userId);
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return token;
  } catch (error) {
    res.status(500).json({ message: "Cannot generate token" });
  }
};

module.exports = {
  generateTokenAndSetCookie,
};
