require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/users");

const JWT_SECRET = process.env.JWT_SECRET;

const registerAUser = async (username, email, password, role) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const result = await User.create({
    username: username,
    email: email,
    password: hashedPassword,
    role: role,
  });
  return result;
};

const loginAUser = async (username, password) => {
  const user = await User.findOne({ username: username });
  const role = user.role;

  if (!user) {
    return res.status(400).json({
      message: "User not found",
    });
  }
  const hashedPassword = user.password;

  const result = await bcrypt.compare(password, hashedPassword);

  if (!result) {
    return res.status(400).json({
      message: "Invalid password",
    });
  }
  const token = jwt.sign({ username, role }, JWT_SECRET, { expiresIn: "1h" });

  return token;
};

module.exports = {
  registerAUser,
  loginAUser,
};
