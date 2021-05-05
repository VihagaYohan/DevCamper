const User = require("../models/User");

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
