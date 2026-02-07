const express = require("express");
const path = require("path");

const app = express();

// static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

/* =======================
   CLEAN URL ROUTES
======================= */
app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "contact.html"));
});

app.get("/services", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "services.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "about.html"));
});

/* =======================
   HTML → CLEAN URL REDIRECTS
======================= */
app.get("/contact.html", (req, res) => {
  res.redirect(301, "/contact");
});

app.get("/services.html", (req, res) => {
  res.redirect(301, "/services");
});

app.get("/about.html", (req, res) => {
  res.redirect(301, "/about");
});

/* =======================
   FORM SUBMIT
======================= */
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

/* =======================
   START SERVER
======================= */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
