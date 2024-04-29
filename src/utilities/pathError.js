const pathError = (req, res) => {
  res.status(404).render("error.ejs", {
    title: "Error 404",
    message: "No se encontró el recusrso que estabas buscando",
  });
};

export { pathError };
