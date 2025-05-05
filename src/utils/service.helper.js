function getPagination(page = 1, limit = 10) {
  const parsedPage = Math.max(1, parseInt(page));
  const parsedLimit = Math.max(1, parseInt(limit));
  const skip = (parsedPage - 1) * parsedLimit;
  return { skip, limit: parsedLimit, page: parsedPage };
}

function getSearchQuery(search, fields = []) {
  if (!search || !fields.length) return {};
  return {
    $or: fields.map((field) => ({
      [field]: { $regex: search, $options: "i" },
    })),
  };
}

module.exports = {
  getPagination,
  getSearchQuery,
};
