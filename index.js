const express = require("express");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/form.html");
  // res.json("welcome")
});

app.post("/send-email", (req, res) => {
  const { name, email, area,subject } = req.body;
  console.log(name, email, area);
  const transporter = nodemailer.createTransport({
    service:"gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PASSWORD,
    },
  });

  const mailoption = {
    from: "ajaykere663@gmail.com",
    name:name,
    to: email,
    subject: subject,
    text: area,
  };

  transporter.sendMail(mailoption, (err, info) => {
    if (err) {
      console.log(err);
    } else {
        res.json({success:true,message:"mail sent successfullt"})
      console.log(info);
    }
  });
});

app.listen(2546, console.log("server started on port 2546"));
