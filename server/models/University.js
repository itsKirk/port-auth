const mongoose = require("mongoose");

const universitySchema = new mongoose.Schema(
  {
    country: {
      type: "String",
    },
    alpha_two_code: {
      type: "String",
    },
    name: {
      type: "String",
    },
    "state-province": {
      type: "Mixed",
    },
    domains: {
      type: ["String"],
    },
    web_pages: {
      type: ["String"],
    },
  },
  { timestamps: true }
);

const University = mongoose.model("University", universitySchema);

module.exports = University;
