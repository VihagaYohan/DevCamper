const { Bootcamp } = require("../models/Bootcamp");

// @desc    get all bootcamps
// @route   GET /api/v1/bootcamps
// @access  public
exports.getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find();
    if (bootcamps === null)
      return res.status(400).json({
        sucess: false,

        data: "There are no bootcamps",
      });

    res.status(200).json({
      sucess: true,
      count: bootcamps.length,
      msg: bootcamps,
    });
  } catch (error) {
    res.status(400).json({
      sucess: false,
      msg: error,
    });
  }
};

// @desc    get a single bootcamp
// @route   GET /api/v1/bootcamps/:id
// @access  public
exports.getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);
    if (!bootcamp)
      return res.status(404).json({
        sucess: false,
        data: "Bootcamp for the given ID was not found",
      });

    res.status(200).json({
      sucess: true,
      msg: bootcamp,
    });
  } catch (error) {
    res.status(400).json({
      sucess: false,
      msg: error,
    });
  }
};

// @desc    create a single bootcamp
// @route   POST /api/v1/bootcamps
// @access  private
exports.createBootcamp = async (req, res, next) => {
  //const bootcamp = Bootcamp.create(req.body);

  const bootcamp = Bootcamp.create(req.body);
  console.log(bootcamp);
  res.status(201).json({
    sucess: true,
    msg: bootcamp,
  });
};

// @desc    update a single bootcamp
// @route   PUT /api/v1/bootcamps/:id
// @access  private
exports.updateBootcamp = async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!bootcamp)
    return res.status(404).json({
      sucess: false,
      data: "Bootcamp for the given ID was not found",
    });

  res.status(200).json({
    sucess: true,
    msg: bootcamp,
  });
};

// @desc    delete a bootcamp
// @route   DELETE /api/v1/bootcamps/:id
// @access  private
exports.deleteBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndRemove(req.params.id);

    if (!bootcamp)
      return res.status(404).json({
        sucess: false,
        msg: "Bootcamp for the given ID was not found",
      });

    res.status(200).json({
      sucess: true,
      msg: bootcamp,
    });
  } catch (error) {
    res.status(400).json({
      sucess: false,
      msg: error,
    });
  }
};
