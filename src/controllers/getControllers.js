const getIndexControllers = (req, res) => {
  res.render("index.ejs", { title: "Optimizador de imágenes" });
};

export { getIndexControllers };
