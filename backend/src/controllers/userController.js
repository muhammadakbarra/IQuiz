const bcrypt = require("bcrypt");
const User = require("../models/Users");

exports.createUser = async (req, res) => {
  const {
    username,
    password,
    fullname,
    email,
    googleId,
    description,
    profilePhoto,
  } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      Username: username,
      Password: hashedPassword,
      Fullname: fullname,
      Email: email,
      GoogleId: googleId,
      Description: description,
      ProfilePhoto: profilePhoto,
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: "User Not found " });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  const { fullname, email, description, profilePhoto } = req.body;
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: "User Not Found" });
    await user.update({
      Fullname: fullname,
      Email: email,
      Description: description,
      ProfilePhoto: profilePhoto,
    });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: "User Not found" });
    await user.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
