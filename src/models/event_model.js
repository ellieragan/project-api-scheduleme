/* eslint-disable import/no-extraneous-dependencies */

import mongoose, { Schema } from 'mongoose';

/**
 *
DESCRIPTION:
EVENT (15 min interval in calendar):
- id: automatically generated by mongo
- day:  integer (0-6, Sunday through Saturday)
- time: integer (1-24 for 24-hr time)
- block: integer (0-3 for 15 min quarters)
- availableCount: integer (number of people available during this interview)
- available: Array of User IDs   - people available during this interval
 */

export const EventSchema = new Schema({
  day: { type: Number, required: true },
  time: { type: Number, required: true },
  block: { type: Number, required: true },
  count: { type: Number, required: true },
  available: { type: [String] },
}, {
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
});

const EventModel = mongoose.model('Event', EventSchema);

export default EventModel;
