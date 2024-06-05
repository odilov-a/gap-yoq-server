const Video = require('../models/Video.js');
const paginate = require('../utils/pagination.js');

exports.getAllVideos = async (req, res) => {
  try {
    const data = await paginate(Video, req.query);
    return res.json(data);
  } catch (err) {
    return res.status(400).json(err);
  }
}

exports.addVideo = async (req, res) => {
  try {
    req.body.images = req.images;
    req.body.video = req.video;
    const newVideo = new Video({
      ...req.body,
    });
    await newVideo.save();
    return res.status(201).json({
      data: newVideo,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
}

exports.addVideo = async (req, res) => {
  try {
    if(req.images.length > 0) {
      req.body.images = req.images;
    }
    if(req.video.length > 0) {
      req.body.video = req.video;
    }
    const findVideo = await Video.findByIdAndUpdate(req.params.id,
      { ...req.body },
      { new: true },
    );
    if(!findVideo) {
      return res.status(404).json({
        message: "Video Not Found!"
      });
    };
    return res.json({
      message: "Video Updated!",
      data: findVideo,
    });
  }
  catch (err) {
    return res.status(400).json(err);
  }
}

exports.addVideo = async (req, res) => {
  try {
    const findVideo = await Video.findByIdAndDelete(req.params.id);
    if (!findVideo) {
      return res.status(404).json({
        message: "Video Not Found!",
      });
    }
    return res.json({
      message: "Video Deleted!",
    });
  } catch (err) {
    return res.status(400).json(err);
  }
}