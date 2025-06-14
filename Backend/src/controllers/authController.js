exports.authenticateUser = async (req, res) => {
  res.json({ message: "User authenticated", user: req.user });
};
