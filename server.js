const express = require("express");
const path = require("path");

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.post("/request-service", (req, res) => {
  console.log("New Service Request:", req.body);

  res.send(`
    <div style="font-family:Arial; padding:40px; text-align:center;">
      <h2>Thank You!</h2>
      <p>Your request has been received.<br>Our team will contact you shortly.</p>
      <a href="/" style="color:#2bb0ed;">Back to Home</a>
    </div>
  `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running at http://localhost:" + PORT);
});
