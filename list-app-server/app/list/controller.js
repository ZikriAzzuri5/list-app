const List = require("./model");

const create = async (req, res, next) => {
  try {
    const list = new List(req.body);
    await list.save();
    res.status(201).json(list);
  } catch (err) {
    console.log(err);
    if (err.name === "ValidationError") {
      const firstError = Object.values(err.errors)[0].message;
      return res.status(400).json({
        success: false,
        message: firstError,
      });
    }
    next(err);
  }
};

const update = async (req, res, next) => {
  const { id } = req.params;
  const payload = req.body;

  try {
    let list = await List.findByIdAndUpdate(id, payload, { new: true });
    if (!list) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    return res.json(list);
  } catch (err) {
    if (err && err.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }
    next(err);
  }
};

const index = async (req, res, next) => {
  try {
    const { skip = 0, limit = 10 } = req.query;
    const list = await List.find().skip(parseInt(skip)).limit(parseInt(limit));

    return res.json({ success: true, list });
  } catch (error) {
    next(error);
  }
};

const destroy = async (req, res, next) => {
  try {
    if (!(await List.findByIdAndDelete(req.params.id))) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }
    return res.json({ success: true });
  } catch (error) {
    next(error);
  }
};

module.exports = { create, index, update, destroy };
