import mongoose, { Schema } from 'mongoose';

export const SchedulerSchema = new Schema({
  creator: { type: String, required: true }, // who created the schedule@now
  daysOfInterest: { type: [String], required: true }, // to have the days of the week the creator of the app is interested in
  users: { type: [String], required: true },
  calendarID: { type: String, required: true }, // to decide which ca;endar a user gets based on the link they had shared with them
}, {
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
});

const SchedulerModel = mongoose.model('Scheduler', SchedulerSchema);

export default SchedulerModel;
