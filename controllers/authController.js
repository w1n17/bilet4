const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

module.exports = {
  register: async (req, res) => {
    try {
      const hashedPass = await bcrypt.hash(req.body.password, 10);
      const user = await User.create({
        email: req.body.email,
        password: hashedPass,
      });
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const user = await User.findOne({ where: { email: req.body.email } });
      if (!user) throw new Error("User not found");

      const valid = await bcrypt.compare(req.body.password, user.password);
      if (!valid) throw new Error("Invalid password");

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
      res.json({ token });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  },
};
