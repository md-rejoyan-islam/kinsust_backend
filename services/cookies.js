const setCookies = ({ res, name, value, maxAge }) => {
  res.cookie(name, value, {
    httpOnly: true,
    maxAge: maxAge,
    secure: true, // only https
    sameSite: "none",
  });
};

const clearCookie = ({ res, name }) => {
  res.clearCookie(name, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
};

module.exports = {
  setCookies,
  clearCookie,
};
