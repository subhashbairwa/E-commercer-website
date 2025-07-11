// ✅ adminAuth.js
import jwt from 'jsonwebtoken';

const adminAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.json({ success: false, message: "Not Authorized. Login again" });
    }

    const token = authHeader.split(" ")[1];
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    if (
      token_decode.email !== process.env.ADMIN_EMAIL ||
      token_decode.role !== "admin"
    ) {
      return res.json({ success: false, message: "Not Authorized. Login again" });
    }

    next();
  } catch (error) {
    console.error("Admin auth error:", error.message);
    return res.json({ success: false, message: "Not Authorized. Login again" });
  }
};

export default adminAuth;