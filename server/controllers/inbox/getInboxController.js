const ContactModel = require("../../models/contact.model");

exports.getInbox = async (req, res) => {
  const { page, perPage } = req.query;

  try {
    const messages = await ContactModel.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * perPage)
      .limit(perPage);
    const count = await ContactModel.countDocuments();

    res.status(200).json({ message: messages, count: count });
  } catch (err) {
    res.status(401).json({ message: "Unable to get inbox right now." });
  }
};
