// if user is not admin or superAdmin

const hideFromUser = (user, [...fields]) => {
  const model = { ...user }.dataValues;
  if (!(user.role === "admin" || user.role === "superAdmin")) {
    fields.forEach((field) => {
      delete model[field];
    });
  }
  return (user = { ...model });
};

module.exports = hideFromUser;
