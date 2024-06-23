const { log } = require("console");
const express = require("express");

const { Sequelize, DataTypes, QueryTypes } = require("sequelize");
const config = require("./config/config.json");
const bcrypt = require("bcrypt");
const session = require("express-session");
const flash = require("express-flash");
const path = require("path");
const app = express();
const port = 5000;


app.use("/assets", express.static(path.join(__dirname, "src/assets")));


app.use(express.urlencoded({ extended: true }));


app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true,
}));
app.use(flash()); 


app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "src/views"));

// Sequelize setup
const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    host: config.development.host,
    dialect: config.development.dialect,
  }
);


sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

// Definisi model menggunakan Sequelize
const projek = sequelize.define("projek", {
  title: DataTypes.STRING,
  content: DataTypes.TEXT,
  startDate: DataTypes.DATEONLY,
  endDate: DataTypes.DATEONLY,
  nodeJS: DataTypes.BOOLEAN,
  reactJS: DataTypes.BOOLEAN,
  nextJS: DataTypes.BOOLEAN,
  typeScript: DataTypes.BOOLEAN,
  startYear: DataTypes.INTEGER, 
  durationDays: DataTypes.INTEGER, 
});


app.get("/", async (req, res) => {
  const projects = await projek.findAll();
  res.render("index", { projects });
});

app.get("/add-projek", (req, res) => {
  res.render("add-projek");
});

app.post("/add-projek", async (req, res) => {
  const {
    title,
    content,
    startDate,
    endDate,
    nodeJS,
    reactJS,
    nextJS,
    typeScript,
  } = req.body;

  // Menghitung startYear
  const start = new Date(startDate);
  const startYear = start.getFullYear();

  // Menghitung durationDays
  const end = new Date(endDate);
  const durationMs = end - start;
  const durationDays = Math.floor(durationMs / (1000 * 60 * 60 * 24));

  await projek.create({
    title,
    content,
    startDate,
    endDate,
    nodeJS: nodeJS === "on",
    reactJS: reactJS === "on",
    nextJS: nextJS === "on",
    typeScript: typeScript === "on",
    startYear, 
    durationDays, 
  });
  req.flash('success', 'Projek berhasil ditambahkan'); 
  res.redirect("/");
});

app.get("/detail-projek/:id", async (req, res) => {
  const project = await projek.findByPk(req.params.id);
  if (project) {
    res.render("detail-projek", { project });
  } else {
    res.status(404).send("Projek tidak ditemukan");
  }
});

app.get("/testimonial", (req, res) => {
  res.render("testimonial");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/update-projek/:id", async (req, res) => {
  const project = await projek.findByPk(req.params.id);
  if (project) {
    res.render("update-projek", { project });
  } else {
    req.flash('error', 'Projek tidak ditemukan'); 
    res.status(404).send("Projek tidak ditemukan");
  }
});

app.post("/update-projek/:id", async (req, res) => {
  const {
    title,
    content,
    startDate,
    endDate,
    nodeJS,
    reactJS,
    nextJS,
    typeScript,
  } = req.body;

  // Menghitung startYear
  const start = new Date(startDate);
  const startYear = start.getFullYear();

  // Menghitung durationDays
  const end = new Date(endDate);
  const durationMs = end - start; 
  const durationDays = Math.floor(durationMs / (1000 * 60 * 60 * 24)); 

  await projek.update(
    {
      title,
      content,
      startDate,
      endDate,
      nodeJS: nodeJS === "on",
      reactJS: reactJS === "on",
      nextJS: nextJS === "on",
      typeScript: typeScript === "on",
      startYear, 
      durationDays,
    },
    {
      where: { id: req.params.id },
    }
  );
  req.flash('success', 'Projek berhasil diperbarui'); 
  res.redirect("/");
});

app.post("/delete-projek/:id", async (req, res) => {
  await projek.destroy({
    where: { id: req.params.id },
  });
  req.flash('success', 'Projek berhasil dihapus'); 
  res.redirect("/");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  
  const user = await User.findOne({ where: { username, password } });

  if (user) {
   
    req.session.user = user;
    req.flash('success', 'Login berhasil'); 
    res.redirect("/dashboard");
  } else {
    req.flash('error', 'Username atau password salah'); 
    res.status(401).redirect("/login");
  }
});

app.post("/register", async (req, res) => {
  const { username, name, email, password, confirmPassword } = req.body;

  
  if (password !== confirmPassword) {
    req.flash('error', 'Password dan konfirmasi password tidak cocok'); 
    return res.status(400).redirect("/register");
  }


  try {
    const newUser = await User.create({ username, name, email, password });

    if (newUser) {
      req.flash('success', 'Pendaftaran berhasil, silakan login'); 
      res.redirect("/login");
    } else {
      req.flash('error', 'Gagal mendaftarkan user baru'); 
      res.status(500).redirect("/register");
    }
  } catch (error) {
    req.flash('error', 'Terjadi kesalahan: ' + error.message); 
    res.status(500).redirect("/register");
  }
});

app.get("/dashboard", async (req, res) => {
  if (!req.session.user) {
    req.flash('error', 'Anda harus login terlebih dahulu'); 
    return res.status(401).redirect("/login");
  }

  const projects = await projek.findAll({ where: { userId: req.session.user.id } });

  res.render("dashboard", { user: req.session.user, projects });
});

// Menjalankan server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
