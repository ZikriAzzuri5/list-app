const List = require("./model");

const create = async (req, res, next) => {
  try {
    let payload = req.body;
    let list = new List(payload);
    await list.save();

    return res.json(list);
  } catch (err) {
    if (err && err.name === "ValidationError") {
      return res.json({
        success: false,
        message: err.message,
      });
    }
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    let payload = req.body;
    let list = await List.findById(req.params.id, payload);
    if (!list) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }
    await list.save();
    return res.json(list);
  } catch (err) {
    if (err && err.name === "ValidationError") {
      return res.json({
        success: false,
        message: err.message,
      });
    }
    next(err);
  }
};

const index = async (req, res, next) => {
  try {
    let { skip = 0, limit = 10 } = req.query;
    let list = await List.find().skip(parseInt(skip)).limit(parseInt(limit));

    return res.json({
      success: true,
      list,
    });
  } catch (error) {
    next(error);
  }
};

const destroy = async (req, res, next) => {
  try {
    let list = await List.findByIdAndDelete(req.params.id);
    if (!list) {
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
