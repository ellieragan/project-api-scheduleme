/* eslint-disable import/prefer-default-export */
import Event from '../models/event_model';

// similar structure from platform-api-MariaC27 (lab 5)
export async function createEvent(eventFields) {
  const event = new Event();
  event.day = eventFields.day;
  event.time = eventFields.time;
  event.block = eventFields.block;
  event.count = eventFields.count;
  event.available = eventFields.available;
  try {
    const savedevent = await event.save();
    return savedevent; // return event
  } catch (error) {
    throw new Error(`create event error: ${error}`);
  }
}

export async function getEvents() {
  try {
    const events = await Event.find();
    return events;
  } catch (error) {
    throw new Error(`get events error: ${error}`);
  }
}

export async function getEvent(id) {
  try {
    const event = await Event.findById(id);
    return event;
  } catch (error) {
    throw new Error(`get event error: ${error}`);
  }
}

export async function deleteEvent(id) {
  try {
    const res = await Event.findByIdAndRemove(id);
    return res; // return result of delete
  } catch (error) {
    throw new Error(`delete event error: ${error}`);
  }
}

export async function updateEvent(id, eventFields) {
  try {
    const res = await Event.findByIdAndUpdate(id, eventFields, { new: true }); // "new: true" gives updated event
    return res; // return updated event
  } catch (error) {
    throw new Error(`update event error: ${error}`);
  }
}
