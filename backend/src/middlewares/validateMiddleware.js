export const validate = (schema) => (req, res, next) => {
  const errors = [];

  for (const rule of schema) {
    const value = req.body[rule.field];

    if (rule.required && (value === undefined || value === null || value === "")) {
      errors.push({ field: rule.field, message: "required" });
      continue;
    }

    if (rule.type === "string" && typeof value !== "string") {
      errors.push({ field: rule.field, message: "must be a string" });
      continue;
    }

    if (rule.enum && !rule.enum.includes(value)) {
      errors.push({ field: rule.field, message: `must be one of: ${rule.enum.join(", ")}` });
    }
  }

  if (errors.length) return res.status(400).json({ error: "ValidationError", details: errors });
  next();
};
