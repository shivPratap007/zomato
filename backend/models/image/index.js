const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema(
  {
    images: [
      {
        location: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

const Images = mongoose.model("Images", imageSchema);
module.exports = { Images };
