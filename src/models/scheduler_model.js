import mongoose, { Schema } from 'mongoose';

export const SchedulerSchema = new Schema({
  creator: { type: String, required: true }, // who created the schedule@now
  title: { type: String, required: true }, // title of the schedule@now
  events: { type: [Schema.Types.ObjectId] }, // array of event ids, which are the blocks of time for a specific scheduler
}, {
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
});

const SchedulerModel = mongoose.model('Scheduler', SchedulerSchema);

export default SchedulerModel;
