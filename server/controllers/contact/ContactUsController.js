const ContactModel = require("../../models/contact.model");

exports.contactUs = async (req, res) => {
  const { username, email, message } = req.body;

  try {
    const contactUs = new ContactModel({
      username,
      email,
      message,
      read: false,
    });
    await contactUs.save();
    res.status(200).json({ message: "Successfully send the enqiry." });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Sorry Cannot send your enquiry right now." });
  }
};
