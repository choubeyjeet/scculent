const userModel = require("../../models/user.model");
const mongoose = require("mongoose");
const crypto = require("crypto");
const joi = require("joi");
const jwt = require("jsonwebtoken");
const generateToken = require("../../token/generateToken");
const {
  registerValidation,
  loginValidation,
  profileUpdate,
  checkPassword,
} = require("../../utils/validation");
const sendEmail = require("../../utils/sendMail");
// const uploadImageCloudinary = require("../../utils/cloudinary/cloudinary");
const path = require("path");
const TokenModel = require("../../models/token.model");

/*
    @route register api/v1/user/register
    @desc user registration
    @access private
*/
exports.Register = async (req, res) => {
  const { error, value } = registerValidation.validate(req.body, userModel, {
    abortEarly: false,
  });

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  try {
    const { firstname, lastname, email, password } = value;
    //check if email already exist or not.
    const duplicateEmail = await userModel.findOne({ email: email });
    if (duplicateEmail) {
      return res.status(400).json({
        error: `This ${email} address already register.Please try with new email.`,
      });
    }
    const user = new userModel({
      firstname,
      lastname,
      email,
      password,
    });
    console.log(value);
    await user.save();
    const emails = user.email;
    const subject = "Welcome to Plantory - Where Every Leaf Tells a Story!";
    const type = "register";
    const username = user.firstname + " " + user.lastname;

    const websiteURL = "https://google.com";
    await sendEmail({ type, emails, subject, username, websiteURL });

    return res.status(200).json({ message: "user registeration.", user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
/*
    @route login api/v1/user/login
    @desc user login
    @access private
*/
exports.Login = async (req, res) => {
  const { error, value } = loginValidation.validate(req.body, userModel, {
    abortEarly: false,
  });
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  try {
    const { email, password } = value;
    const checkEmail = await userModel
      .findOne({ email: email })
      .select("+password");

    if (!checkEmail) {
      return res.status(404).json({ error: `This ${email} not found.` });
    }
    const matchPassword = await checkEmail.matchPassword(password);
    if (!matchPassword) {
      return res.status(401).json({ error: "Invalid Credentails." });
    }
    const accessToken = await generateToken.accessToken(checkEmail);
    const refreshToken = await generateToken.refreshToken(checkEmail);
    return res.status(200).json({
      status: 1,
      message: "Login successfully.",
      userInfo: checkEmail,
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};
/*
    @route fetch api/v1/user/all-users
    @desc See All users
    @access public
*/
exports.fetchAllUser = async (req, res) => {
  const user = await userModel
    .find()
    .select({ firstname: 1, lastname: 1, email: 1 })
    .sort({ createAt: 1 });
  const totalCountUser = await userModel
    .find({ role: "USER" })
    .countDocuments();

  try {
    if (user?.length < 0) {
      return res.status(400).json({ status: 0, message: "No user Found." });
    }
    return res.status(200).json({
      status: 1,
      message: "Fetch All user",
      users: user,
      count: totalCountUser,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
/*
    @route delete api/v1/user/:id
    @desc delete users
    @access delete
*/
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ status: 0, error: "Invalid user id." });
  }
  try {
    const user = await userModel.findByIdAndDelete({ _id: id });
    if (!user) {
      return res.status(400).json({ status: 0, error: "User not found." });
    }
    return res.status(200).json({
      status: 1,
      messae: `The user with this ID="${id}" has been deleted successfully.`,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
/*
    @route Single api/v1/user/:id
    @desc fetch single user
    @access public
*/
exports.singleUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ status: 0, error: "Invalid user id." });
  }
  try {
    const user = await userModel.findById({ _id: id });
    if (!user) {
      return res.status(400).json({ status: 0, error: "User not found." });
    }
    return res.status(200).json({
      status: 1,
      messae: `Single user fetch.`,
      userInfo: user,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
/*
    @route profile api/v1/user/profile/:id
    @desc userprofile user
    @access public
*/
exports.userProfile = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ status: 0, error: "Invalid user id." });
  }
  try {
    const user = await userModel.findById({ _id: id });
    if (!user) {
      return res.status(400).json({ status: 0, error: "User not found." });
    }
    return res.status(200).json({
      status: 1,
      messae: `Single user fetch.`,
      userInfo: user,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
/*
    @route update Profile api/v1/user/update/:id
    @desc user profile user
    @access public
*/
exports.updateProfile = async (req, res) => {
  const { _id } = req.user;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).json({ status: 0, error: "Invalid user id." });
  }
  const { error, value } = profileUpdate.validate(req.body, userModel);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  try {
    const { firstname, lastname, email, bio } = value;
    const user = await userModel.findByIdAndUpdate(
      _id,
      {
        firstname: firstname,
        lastname: lastname,
        email: email,
        bio: bio,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    return res.status(200).json({
      status: 1,
      message: "Profile Update succesfully. ",
      userInfo: user,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
/*
    @route update Profile api/v1/user/changePassword/
    @desc user update password
    @access private
*/
exports.changePassword = async (req, res) => {
  const { _id } = req.user;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).json({ status: 0, error: "Invalid user id." });
  }
  const { error, value } = checkPassword.validate(req.body, userModel);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const user = await userModel.findById(_id).select("+password");
  try {
    const { newPassword, currentPassword } = value;

    const currentPasswordValid = await user.matchPassword(currentPassword);
    if (!currentPasswordValid) {
      return res.status(400).json({ status: 0, error: "Invalid Password" });
    }

    const newPasswordvalid = await user.matchPassword(newPassword);
    if (newPasswordvalid) {
      return res.status(400).json({
        status: 0,
        error: "New password cannot be same as current password.",
      });
    }

    user.password = newPassword;
    await user.save();
    return res.status(200).json({
      status: 1,
      message: "Password successfully updated.",
      userInfo: user,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.forgetPassword = async (req, res) => {
  const emailValid = joi.object({
    email: joi.string().min(5).max(50).required().email(),
  });
  let { error, value } = emailValid.validate(req.body, userModel);
  try {
    if (error) {
      return res.status(500).json({ error: error.details[0].message });
    }
    const user = await userModel.findOne({ email: value.email }).exec();
    if (!user) {
      return res.status(404).json({ error: `This ${value.email} not found.` });
    }
    //main logic start
    const token = await user.resetToken();
    await user.save();
    let type = "reset";
    let emails = "anujsinghnainwal@gmail.com";
    let subject = "Reset Password Token";
    let username = `${user.firstname} ${user.lastname}`;
    let resetUrl = `http://localhost:3000/resetPassword/${token}`;
    await sendEmail({ type, emails, subject, username, resetUrl });
    return res.status(200).json({
      message: "Password reset link successfully sent in your email account.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error });
  }
};
/*
    @route forgetPassword user api/v1/user/forgetPassword
    @desc user forget Password
    @access public
*/
exports.resetPassword = async (req, res) => {
  let { token } = req.params;
  const joiPassword = joi.object({
    password: joi.string().min(8).max(50).required().trim(),
  });
  const hashToken = crypto.createHash("sha256").update(token).digest("hex");
  try {
    const user = await userModel.findOne({
      passwordResetToken: hashToken,
      passwordResetTokenExpire: { $gt: Date.now() },
    });
    // if no user found, token is invalid or expired
    if (!user) {
      return res
        .status(400)
        .json({ message: "Reset Token was expired please generate new One." });
    }
    // update the user's password with the new password
    let { error, value } = joiPassword.validate(req.body, userModel);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    user.password = value.password;

    // clear the resetToken and resetExpires fields
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpire = undefined;

    // save the user and return success message
    await user.save();

    return res.json({
      message: "Password reset successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

exports.profileUpdate = async (req, res) => {
  const loginId = req.user._id;
  if (!mongoose.Types.ObjectId.isValid(loginId)) {
    return res.status(400).json({ error: "Inavlid Id" });
  }
  try {
    const localPath = path.join(
      __dirname,
      "..",
      "..",
      `/public/images/profile/${req.file.filename}`
    );
    const uploadImage = await uploadImageCloudinary.cloudinaryUploadImage(
      localPath,
      `userProfile`
    );
    const userFound = await userModel.findById(loginId);
    userFound.profilePic = uploadImage?.url;
    await userFound.save();
    return res.status(200).json({
      message: "Profile Pic Upload successfully",
      userInfo: userFound,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.refreshToken = async (req, res) => {
  try {
    const { refreshToken, userId } = req.body;
    // if (!ObjecId.isValid(userId)) {
    //   return res.status(400).json({ error: "Invalid Id" });
    // }
    const token = await TokenModel.findOne({ refreshToken: refreshToken });
    if (!token) {
      return res.status(403).json({ error: "Token not found" });
    }
    if (token.used) {
      return res.status(400).json({ error: "Token already used" });
    }
    if (token.expireAt < new Date()) {
      await TokenModel.deleteOne({ refreshToken });
      return res
        .status(401)
        .json({ error: "Token was expired. Please login again." });
    }
    let users = await userModel.findById({ _id: userId });
    const user = {
      _id: userId,
      role: users.role,
    };
    const accessToken = await generateToken.accessToken(user);
    token.used = true;
    await token.save();
    return res.json({
      status: 1,
      accessToken,
      message: "Token used successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

exports.status = async (req, res) => {
  const user_id = req.user._id;

  try {
    const user = await userModel.findById(user_id).select("-password");

    return res.status(200).json(user);
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};

exports.logOut = async (req, res, next) => {
  let { userId, refreshToken } = req.body;
  try {
    let token = await TokenModel.findByIdAndDelete({
      userId: userId,
      refreshToken: refreshToken,
    });
    if (!token) {
      return res
        .status(403)
        .json({ error: "Token not found Or Already Deleted." });
    }
    return res.status(200).json({ message: "Logout successfully." });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
