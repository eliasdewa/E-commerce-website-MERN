import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  role: {type: String, default: 'user'},
  profileImage: {type: String},
  bio: {type: String, maxlength: 255},
  profession: {type: String},
  createdAt: {type: Date, default: Date.now()},
});

const userModel = mongoose.models.User || mongoose.model('User', userSchema);
export default userModel;