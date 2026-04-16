

export const verifyUserEmail = (req, res, next) => {
    console.log("verfy emial triggered")
  const email = req.user?.email;
  if (!email) {
    return res.status(403).send("Forbidden access!");
  }
  req.verifiedEmail = email;
  next();
};