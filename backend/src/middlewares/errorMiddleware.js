// middlewares/errorMiddleware.js
export const errorMiddleware = (err, req, res, next) => {
  // Si el error ya trae status/code propio
  const status = err.status || 500;

  // Sequelize: unique constraint
  if (err.name === "SequelizeUniqueConstraintError") {
    return res.status(409).json({
      error: "UniqueConstraintError",
      details: err.errors?.map(e => ({ field: e.path, message: e.message })) ?? [],
    });
  }

  // Sequelize: validation error
  if (err.name === "SequelizeValidationError") {
    return res.status(400).json({
      error: "ValidationError",
      details: err.errors?.map(e => ({ field: e.path, message: e.message })) ?? [],
    });
  }

  // Default
  return res.status(status).json({
    error: err.name || "InternalServerError",
    message: err.message || "Something went wrong",
  });
};
