const CustomError = require("../../utils/CustomError");
const List = require("./model");

const create = async (req, res, next) => {
  try {
    const list = new List({ ...req.body, user: req.user._id });
    await list.save();
    res.status(201).json(list);
  } catch (err) {
    if (err.name === "ValidationError") {
      const firstError = Object.values(err.errors)[0].message;
      return next(new CustomError(firstError, 400));
    }
    next(new CustomError("Failed to create item", 500));
  }
};

const update = async (req, res, next) => {
  const { id } = req.params;
  const payload = req.body;

  try {
    let list = await List.findByIdAndUpdate(id, payload, { new: true });
    if (!list) {
      return next(new CustomError("Item not found", 404));
    }

    return res.json(list);
  } catch (err) {
    if (err && err.name === "ValidationError") {
      return next(new CustomError(err.message, 400));
    }
    next(new CustomError("Failed to update item", 500));
  }
};

const index = async (req, res, next) => {
  try {
    const { skip = 0, limit = 10 } = req.query;
    const list = await List.find({ user: req.user._id })
      .skip(parseInt(skip))
      .limit(parseInt(limit));

    return res.json({ success: true, list });
  } catch (err) {
    next(new CustomError("failed to fetch item", 500));
  }
};

const destroy = async (req, res, next) => {
  try {
    if (!(await List.findByIdAndDelete(req.params.id))) {
      return next(new CustomError("item not found", 404));
    }
    return res.json({ success: true });
  } catch (err) {
    next(new CustomError("failed to delete item", 500));
  }
};

module.exports = { create, index, update, destroy };
