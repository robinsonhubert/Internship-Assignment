const { Long } = require("mongodb");
const Rider = require("../models/riderModel");
const cloudinary = require("../utils/cloudinary");
const fs = require("fs");
const { findByIdAndUpdate } = require("../models/riderModel");

const getAllRiders = async (req, res) => {
    const riders = await Rider.find({}).exec();
    res.status(200).json(riders)
}
const addRider = async (req, res) => {
    try {
        //upload the image to the cloudinary
        const { path } = req.file
        const result = await cloudinary.uploader.upload(path)
        const rider = new Rider({
            Id: parseInt(req.body.Id), // Parse the Id value as an integer
            Name: req.body.Name,
            Email: req.body.Email,
            Position: req.body.Position,
            NRIC: req.body.NRIC,
            Status: req.body.Status,
            Image: result.secure_url,
            cloudinary_id: result.public_id
        });
        await rider.save()
        fs.unlinkSync(path)
        res.status(201).json(rider)
    } catch (error) {
        console.log(error);
    }
}
const editRider = async (req, res) => {
    try {
      let rider = await Rider.findById(req.params.id).exec();
  
      // delete the image from the cloudinary
      await cloudinary.uploader.destroy(rider.cloudinary_id);
  
      let result;
      if (req.file) {
        result = await cloudinary.uploader.upload(req.file.path);
      }
  
      const data = {
        Id: parseInt(req.body.Id), // Parse the Id value as an integer
        Name: req.body.Name || rider.Name,
        Email: req.body.Email || rider.Email,
        Position: req.body.Position || rider.Position,
        NRIC: req.body.NRIC || rider.NRIC,
        Status: req.body.Status || rider.Status,
        Image: result?.secure_url || rider.Image,
        cloudinary_id: result?.public_id || rider.cloudinary_id,
      };
  
      rider = await Rider.findByIdAndUpdate(req.params.id, data, { new: true });
  
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
  
      res.status(200).json(rider);
    } catch (error) {
      console.log(error);
    }
  };
  
const deleteRider = async(req, res) => {
    let rider = await Rider.findById(req.params.id).exec();
    // delete the image from the cloudinary
    await cloudinary.uploader.destroy(rider.cloudinary_id);
    await rider.remove();
    res.status(200).json(`Rider with the name of ${rider.Name} was deleted sucessfully`)
};

const getSingleRider = async(req, res) => {
    try {
        let rider = await Rider.findById(req.params.id).exec();
        res.status(200).json(rider)
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getAllRiders,
    addRider,
    editRider,
    deleteRider,
    getSingleRider
}