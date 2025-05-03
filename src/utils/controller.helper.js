const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

function isValidObjectId(id) {
  return ObjectId.isValid(id);
}

function validateSchema(schema, data) {
  const { error, value } = schema.validate(data, { abortEarly: false });
  if (error) {
    const errors = error.details.map((d) => d.message);
    return { errors };
  }
  return { value };
}

function paginateQuery(query) {
  return {
    search: query.search || "",
    page: parseInt(query.page) || 1,
    limit: parseInt(query.limit) || 10,
  };
}

function handleServerError(res, error) {
  return res.status(500).json({ message: error.message });
}

module.exports = {
  isValidObjectId,
  validateSchema,
  paginateQuery,
  handleServerError,
};
