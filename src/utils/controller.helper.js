const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

// Vérifie si un id valide est fournis
function isValidObjectId(id) {
  return ObjectId.isValid(id);
}

//prend un schema joi en params avec les données à comparée. renvoie les erreurs en cas d'échec sinon renvoie les données validées
function validateSchema(schema, data) {
  const { error, value } = schema.validate(data, { abortEarly: false });
  if (error) {
    const errors = error.details.map((d) => d.message);
    return { errors };
  }
  return { value };
}
// sert uniquement à vérifier que les query sont valides
function paginateQuery(query) {
  return {
    search: query.search || "",
    page: parseInt(query.page) || 1,
    limit: parseInt(query.limit) || 10,
  };
}

//gère les erreurs server
function handleServerError(res, error) {
  console.error(error);
  return res.status(500).json({ message: error.message });
}

module.exports = {
  isValidObjectId,
  validateSchema,
  paginateQuery,
  handleServerError,
};
