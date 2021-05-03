const {Bootcamp} = require("../models/Bootcamp");

// @desc    get all bootcamps
// @route   GET /api/v1/bootcamps
// @access  public
exports.getBootcamps = (req, res, next) => {
  res.status(200).json({
    sucess: true,
    msg: "Show all bootcamps",
  });
};

// @desc    get a single bootcamp
// @route   GET /api/v1/bootcamps/:id
// @access  public
exports.getBootcamp = (req, res, next) => {
  res.status(200).json({
    sucess: true,
    msg: `Show a single bootcamp ${req.params.id}`,
  });
};

// @desc    create a single bootcamp
// @route   POST /api/v1/bootcamps
// @access  private
exports.createBootcamp = async (req, res, next) => {
  const bootcamp = Bootcamp.create(req.body);

  res.status(201).json({
    sucess: true,
    msg: bootcamp,
  });
};

// @desc    update a single bootcamp
// @route   PUT /api/v1/bootcamps/:id
// @access  private
exports.updateBootcamp = (req, res, next) => {
  res.status(200).json({
    sucess: true,
    msg: `Update bootcamp ${req.params.id} `,
  });
};

// @desc    delete a bootcamp
// @route   DELETE /api/v1/bootcamps/:id
// @access  private
exports.deleteBootcamp = (req, res, next) => {
  res.status(200).json({
    sucess: true,
    msg: `Delete bootcamp ${req.params.id}`,
  });
};
