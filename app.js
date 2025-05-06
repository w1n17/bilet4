require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", require("./routes/auth"));
app.use("/servers", require("./routes/servers"));
app.use("/rentals", require("./routes/rentals"));

// Database sync
const PORT = process.env.PORT || 3000;
sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
