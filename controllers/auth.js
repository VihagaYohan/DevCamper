const User = require("../models/User");
const bcrypt = require("bcryptjs");
const sendEmail = require("../utils/sendEmail");
const sendTokenResponse = require("../utils/sendTokenResponse");
const crypto = require("crypto");

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

// @desc  Forgot password
// @route POST/api/v1/auth/forgotpassword
// @access    Public
exports.forgotPassword = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user)
    return res
      .status(404)
      .json({ sucess: false, data: "There is no user with that email" });

  // get reset token
  let resetToken;
  user.getResetPasswordToken().then((r) => {
    resettoken = r;
  });

  await user.save({ validateBeforeSave: false });
  console.log("token goes below");
  console.log(resetToken.PromiseResult);

  // create reset URL
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/resetpassword/${resetToken}`;

  const message = `You are receiving this email because you (or someone else) has requested the reset of a password. please make a PUT request to: \n\n ${resetUrl}`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Password reset token",
      message: message,
    });

    res.status(200).json({ sucess: true, data: "Email has been sent" });
  } catch (error) {
    console.log(error);

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    res.status(500).json({ sucess: false, data: "Email could not sent" });
  }

  /*   res.status(200).json({
    sucess: true,
    data: user,
  }); */
};

// @desc  reset password
// @route PUT/api/v1/auth/resetpassword/:resettoken
// @access Public
exports.resetPassword = async (req, res, next) => {
  // get hashed token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resettoken)
    .digest("hex");

  const user = await Usser.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $get: Date.now() },
  });

  if (!user)
    return res.status(400).json({
      sucess: false,
      data: "Invalid token",
    });

  // set new password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendTokenResponse(user, 200, res);
};
