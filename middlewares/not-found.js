const notFound = (req, res) =>
  res.status(404).send("there is no page matchs that route");

module.exports = notFound;
