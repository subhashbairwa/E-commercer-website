import mongoose from "mongoose";


const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // fixed type
  password: { type: String, required: true },
  cartData: { type: Object, required: true, default: {} }, // fixed type & default

}, { minimize: false });

const userModel = mongoose.models.user || mongoose.model("user", userSchema);
export default userModel;


