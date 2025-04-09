const { registerAUser, loginAUser } = require("../services/users");

const registerUser = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const user = await registerAUser(username, email, password, role);

    res.status(201).json({
      message: "User registered successfully",
      user: user,
    });
  } catch (e) {
    res.status(500).json({
      message: "Error registering user",
    });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username) {
    return res.status(400).send("Username is required");
  }

  if (!password) {
    return res.status(400).send("Password is required");
  }

  const token = await loginAUser(username, password);

  return res.status(200).send({ token: token });
};

module.exports = {
  registerUser,
  loginUser,
};
