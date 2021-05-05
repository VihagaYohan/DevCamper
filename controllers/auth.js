const User = require("../models/User");
const bcrypt = require("bcryptjs");

// @desc      register user
// @route     POST/api/v1/auth/register
// @access    public
exports.register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    // create user

    const user = await User.create({
      name,
      email,
      password,
      role,
    });

    // create token
    const token = user.getSignedJwtToken();

    res.status(200).json({
      sucess: true,
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      sucess: true,
      data: error,
    });
  }
};

// @desc      login user
// @route     POST/api/v1/auth/login
// @access    public
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // validates email and password
    if (!email || !password) {
      return res
        .status(400)
        .json({ sucess: false, msg: "Please provide an email and password" });
    }

    // check for user
    const user = await User.findOne({ email: email }).select("+password");

    if (!user)
      return res
        .status(401)
        .json({ sucess: false, msg: "Invalid credentials" });

    // check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch)
      return res
        .status(401)
        .json({ sucess: false, msg: "Invalid credentials" });

    // create token
    const token = user.getSignedJwtToken();

    res.status(200).json({ sucess: true, token: token });
  } catch (error) {
    res.status(500).json({
      sucess: true,
      data: error,
    });
  }
};


