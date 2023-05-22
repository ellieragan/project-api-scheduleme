/* eslint-disable import/no-extraneous-dependencies */
import { Router } from 'express';
import mongoose from 'mongoose';
import * as Events from './controllers/event_controller';
import EventModel from './models/event_model';

// CITATION: followed format of router in platform-api-MariaC27 (lab 5)

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'welcome to our schedule@now api!' });
});

// check if event with that ID exist before trying to get or delete it
const checkExistence = async (id) => {
  const doesExist = await EventModel.exists({ _id: id });
  if (doesExist != null) {
    return true;
  } else {
    return false;
  }
};

/// routes here

const handleCreateEvent = async (req, res) => {
  try {
    // use req.body etc to await some conteoller function
    const result = await Events.createEvent(req.body);
    // send back the result
    res.json(result);
  } catch (error) {
    // or catch the error and send back an error
    res.status(500).json({ error });
  }
};

const handleGetEvent = async (req, res) => {
  try {
    const exist = await checkExistence(req.params.eventID);
    if (mongoose.isValidObjectId(req.params.eventID) && exist) {
      // use req.body etc to await some controller function
      const result = await Event.getEvent(req.params.eventID);
      // send back the result
      res.json(result);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    // or catch the error and send back an error
    res.status(404).json({ error });
  }
};

const handleGetEvents = async (req, res) => {
  try {
    // use req.body etc to await some conteoller function
    const result = await Events.getEvents();
    // send back the result
    res.json(result);
  } catch (error) {
    // or catch the error and send back an error
    res.status(500).json({ error });
  }
};

const handleUpdate = async (req, res) => {
  try {
    // use req.body etc to await some conteoller function
    const result = await Events.updateEvent(req.params.eventID, req.body);
    // send back the result
    res.json(result);
  } catch (error) {
    // or catch the error and send back an error
    res.status(500).json({ error });
  }
};

const handleDelete = async (req, res) => {
  try {
    // undefined check
    if (req.params.eventID !== 'undefined') {
      // ID existence check
      const exist = await checkExistence(req.params.eventID);
      if (exist) {
        const result = await Events.deleteEvent(req.params.eventID);
        // send back the result
        res.json(result);
      } else {
        res.sendStatus(404);
      }
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

router.route('/events/:eventID')
  .put(handleUpdate)
  .get(handleGetEvent)
  .delete(handleDelete);

router.route('/events')
  .get(handleGetEvents)
  .post(handleCreateEvent);

export default router;
