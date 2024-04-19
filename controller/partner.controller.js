const Partner = require("../models/Partner");

exports.getAllPartner = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const [totalPartner, allPartner] = await Promise.all([
      Partner.countDocuments(),
      Partner.find()
        .skip((page - 1) * perPage)
        .limit(perPage),
    ]);
    const totalPages = Math.ceil(totalPartner / perPage);
    const currentPage = page;
    const totalCount = totalPartner;
    const pageCount = Math.ceil(totalCount / perPage);
    if (allPartner.length === 0) {
      return res.status(404).json({ message: [] });
    }
    return res.json({
      data: allPartner,
      _meta: { currentPage, perPage, totalCount, pageCount },
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

exports.getPartnerById = async (req, res) => {
  try {
    const partner = await Partner.findById(req.params.id);
    if (!partner) {
      return res.status(404).json({ message: "Partner not found" });
    }
    return res.json({ data: partner });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.createPartner = async (req, res) => {
  try {
    req.body.image = req.images;
    const newPartner = await Partner.create(req.body);
    return res.json({ data: newPartner });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.updatePartner = async (req, res) => {
  try {
    if (req.images && req.images.length <= 0) {
      return res.status(400).json({ message: "Invalid image length" });
    }
    const oldPartner = await Partner.findById(req.params.id);
    if (!oldPartner) {
      return res.status(404).json({ message: "Partner not found" });
    }
    req.body.image = req.images;
    const updatedPartner = await Partner.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    return res.json({ data: updatedPartner });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.deletePartner = async (req, res) => {
  try {
    const deletedPartner = await Partner.findByIdAndDelete(
      req.params.id
    );
    if (!deletedPartner) {
      return res.status(404).json({ message: "Partner not found" });
    }
    return res.json({ message: "Partner deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};