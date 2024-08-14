const mongoose = require("mongoose");

// create newsTicker schema

const orgSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter Name"],
    },
    father_name: {
      type: String,
      required: [true, "Please Father's Name"],
    },
    mother_name: {
      type: String,
      required: [true, "Please Mother's Name"],
    },
    dob: {
      type: String,
      required: [true, "Please enter Date of Birth"],
    },
    blood_group: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
      uppercase: true,
      required: [true, "Please enter Blood Group"],
    },
    institution: {
      type: String,
      required: [true, "Please enter Institute Name"],
    },
    dept: {
      type: String,
      required: [true, "Please enter Department Name"],
    },
    session: {
      type: String,
      required: [true, "Please enter Session"],
    },
    reg_no: {
      type: String,
      required: [true, "Please enter Registration Number"],
    },
    home_district: {
      type: String,
      required: [true, "Please enter Home District"],
    },
    phone: {
      type: String,
      required: [true, "Please enter Phone Number"],
    },
    email: {
      type: String,
      required: [true, "Please enter Email Address"],
    },
    activity: {
      type: Array,
      required: [true, "Please enter Activity"],
    },
    org_photo: {
      type: String,
      required: [true, "Please enter Photo"],
    },
    form_number: {
      type: String,
      required: [true, "Please enter Form Number"],
    },
  },
  {
    timestamps: true,
  }
);

// export newsTicker

module.exports = mongoose.model("Organization", orgSchema);
