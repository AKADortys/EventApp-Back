const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

// Vérifie si un id valide est fourni
function isValidObjectId(id) {
  return ObjectId.isValid(id);
}

// Valide les données selon un schéma Joi
function validateSchema(schema, data) {
  const { error, value } = schema.validate(data, { abortEarly: false });
  if (error) {
    const errors = error.details.map((d) => d.message);
    return { errors };
  }
  return { value };
}

// Pour extraire les valeurs de pagination des query params
function paginateQuery(query) {
  return {
    search: query.search || "",
    page: parseInt(query.page) || 1,
    limit: parseInt(query.limit) || 10,
  };
}

// Gère une erreur serveur
function handleServerError(res, error) {
  console.error(error);
  return res.status(500).json({ message: error.message });
}

// Vérifie les permissions d'accès à une ressource
function checkPermissions(req, res, targetUserId) {
  if (!isValidObjectId(targetUserId)) {
    res.status(400).json({ message: "ID invalide" });
    return false;
  }

  console.log(req.user.id + "\n" + targetUserId);

  if (
    String(req.user.id) !== String(targetUserId) &&
    req.user.role !== "admin"
  ) {
    res.status(403).json({
      message:
        "Vous n'avez pas les permissions requises pour accéder à cette ressource",
    });
    return false;
  }

  return true;
}

// Vérifie si un utilisateur existe
function checkUserExists(res, user) {
  if (!user) {
    res.status(404).json({ message: "Utilisateur introuvable" });
    return false;
  }
  return true;
}

// Valide un schéma et renvoie null en cas d’erreur
function validateRequestSchema(res, schema, data) {
  const { errors, value } = validateSchema(schema, data);
  if (errors) {
    res.status(400).json({ errors });
    return null;
  }
  return value;
}

module.exports = {
  isValidObjectId,
  validateSchema,
  paginateQuery,
  handleServerError,
  checkPermissions,
  checkUserExists,
  validateRequestSchema,
};
