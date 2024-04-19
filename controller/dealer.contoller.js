const Dealer = require("../models/Dealer");

exports.getAllDealer = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const [totalDealer, allDealer] = await Promise.all([
      Dealer.countDocuments(),
      Dealer.find()
        .skip((page - 1) * perPage)
        .limit(perPage),
    ]);
    const totalPages = Math.ceil(totalDealer / perPage);
    const currentPage = page;
    const totalCount = totalDealer;
    const pageCount = Math.ceil(totalCount / perPage);
    if (allDealer.length === 0) {
      return res.status(404).json({ message: [] });
    }
    return res.json({
      data: allDealer,
      _meta: { currentPage, perPage, totalCount, pageCount },
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.getDealerById = async (req, res) => {
  try {
    const dealer = await Dealer.findById(req.params.id);
    if (!dealer) {
      return res.status(404).json({ message: "Dealer not found" });
    }
    return res.json({ data: dealer });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.createDealer = async (req, res) => {
  try {
    const newDealer = await Dealer({
      name: req.body.name,
      address: req.body.address,
      number: req.body.number,
    });
    const savedDealer = await newDealer.save();
    return res.json({ data: savedDealer });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.updateDealer = async (req, res) => {
  try {
    const updatedDealer = await Dealer.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        address: req.body.address,
        number: req.body.number,
      },
      { new: true }
    );
    if (!updatedDealer) {
      return res.status(404).json({ message: "Dealer not found" });
    }
    return res.json({ data: updatedDealer });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.deleteDealer = async (req, res) => {
  try {
    const deletedDealer = await Dealer.findByIdAndDelete(req.params.id);
    if (!deletedDealer) {
      return res.status(404).json({ message: "Dealer not found" });
    }
    return res.json({ message: "Dealer deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
