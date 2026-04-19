export const verifyAdmin = (userCollections) => {
  return async (req, res, next) => {
    try {
      console.log("admin triggered");

      const email = req.verifiedEmail;

      const user = await userCollections.findOne({ email });

      // console.log("from admin hookss", email, user)

      if (!user || user.role !== "admin") {
        return res.status(403).send("Forbidden: admin access only");
      }
      
      next();

    } catch (err) {
      console.error("verifyAdmin error:", err);
      res.status(500).send({ error: err.message });
    }
  };
};