const setCookies = ({ res, name, value, maxAge }) => {
  res.cookie(name, value, {
    httpOnly: true,
    maxAge: maxAge,
    secure: true, // only https
    sameSite: "strict",
  });
};

const clearCookie = ({ res, name }) => {
  res.clearCookie(name, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
};

module.exports = {
  setCookies,
  clearCookie,
};
