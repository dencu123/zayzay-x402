const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.status(402).json({
    error: "Payment Required"
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
