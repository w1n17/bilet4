const { Server, Rental } = require("../models");

module.exports = {
  rent: async (req, res) => {
    try {
      const server = await Server.findByPk(req.body.serverId);
      if (!server || server.status) throw new Error("Server unavailable");

      const rental = await Rental.create({
        endDate: new Date(Date.now() + req.body.days * 86400000),
        UserId: req.user.id,
        ServerId: server.id,
      });

      await server.update({ status: true });
      res.json(rental);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  list: async (req, res) => {
    try {
      const rentals = await Rental.findAll({
        where: { UserId: req.user.id },
        include: ["Server"],
      });
      res.json(rentals);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  extend: async (req, res) => {
    try {
      const rental = await Rental.findByPk(req.params.id);
      if (!rental) throw new Error("Rental not found");

      rental.endDate = new Date(
        rental.endDate.getTime() + req.body.days * 86400000
      );
      await rental.save();
      res.json(rental);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};
