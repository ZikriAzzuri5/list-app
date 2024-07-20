const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const listSchema = Schema({
  name: {
    type: String,
    minLength: [3, "Name must be at least 3 characters long"],
    maxLength: [20, "Name must not exceed 20 characters"],
    required: [true, "name is required"],
  },
  status: {
    type: Boolean,
    default: false,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true],
  },
});

module.exports = model("List", listSchema);
