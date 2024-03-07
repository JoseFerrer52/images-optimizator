const errorRouter = (req, res, next) => {
  res.status(404).render("error.ejs", {
    title: "Error 404 Not Found",
    message: "El recurso que estás buscando no existe.",
  });
};

const errorServer = (err, req, res, next) => {
  //console.error(err.stack);
  res.status(500).send(`Ocurrio un error en el servidor`);
};

export { errorRouter, errorServer };
