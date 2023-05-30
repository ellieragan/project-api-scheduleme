/* eslint-disable import/no-extraneous-dependencies */
import mongoose, { Schema } from 'mongoose';

export const UserSchema = new Schema({
  email: { type: String, required: true },
  events: { type: [String], required: true }, // from gcal
}, {
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
});

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
