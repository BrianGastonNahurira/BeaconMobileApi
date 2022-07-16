const router = require("express").Router();
const { Hostel } = require("../models/model");

//the brain for adding a new hostel
const add_hostel = async (req, res) => {
  console.log(req.body);
  const hostel = new Hostel({
    hostel_name: req.body.hostel_name,
    room_type: req.body.room_type,
    available_rooms: req.body.available_rooms,
    hostel_fee: req.body.hostel_fee,
    hostel_account_no: req.body.hostel_account_no,
    telphone_number: req.body.telphone_number,
    hostel_distance: req.body.hostel_distance,
    hostel_description: req.body.hostel_description,
    hostel_rules: req.body.hostel_rules,
    product_images: "",
    confirmed: false,
  });
  try {
    const save_added_hostel = await hostel.save();
    res.send({ status: true, result: save_added_hostel });
  } catch (error) {
    console.log(error);
    res.send({ status: false, data: "An Error Occured", result: error });
  }
};

//gets pending hostels for display
const pending_hostel = async (req, res) => {
  try {
    const pending_hostel = await Hostel.find({ confirmed: { $eq: false } });
    res.send({ status: true, result: pending_hostel });
  } catch (error) {
    console.log(error);
    res.send({ status: false, data: "An Error Occured", result: error });
  }
};

module.exports = {
  add_hostel,
  pending_hostel,
};
