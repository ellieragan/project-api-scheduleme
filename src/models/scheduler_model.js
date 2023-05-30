import mongoose, { Schema } from 'mongoose';

export const SchedulerSchema = new Schema({
  creator: { type: String, required: true }, // who created the schedule@now
  users: { type: [String], required: true },
  events: { type: [Schema.Types.ObjectId] }, // array of event ids, which are the blocks of time for a specific scheduler
}, {
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
});

const SchedulerModel = mongoose.model('Scheduler', SchedulerSchema);

export default SchedulerModel;
