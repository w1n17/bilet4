const { Server } = require("../models");

module.exports = {
  list: async (req, res) => {
    try {
      const servers = await Server.findAll({ where: { status: false } });
      res.json(servers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }, // ← Закрывающая фигурная скобка и запятая для метода list

  create: async (req, res) => {
    try {
      const server = await Server.create({
        game: req.body.game,
        slots: req.body.slots,
      });
      res.status(201).json(server);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};
