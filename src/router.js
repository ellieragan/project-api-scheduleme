/* eslint-disable import/no-extraneous-dependencies */
import { Router } from 'express';
import mongoose from 'mongoose';
import * as Events from './controllers/event_controller';
import * as Users from './controllers/user_controller';
import * as Schedulers from './controllers/scheduler_controller';
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
      const result = await Events.getEvent(req.params.eventID);
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

const handleCreateUser = async (req, res) => {
  try {
    const result = await Users.createUser(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const handleGetUserEvents = async (req, res) => {
  try {
    const result = await Users.getUserEvents(req.params.userID);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const handleGetUsers = async (req, res) => {
  try {
    const result = await Users.getUsers();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const handleCreateSchedule = async (req, res) => {
  try {
    const result = await Schedulers.createScheduler(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// const handleJoinSchedule = async (req, res) => {
//   try {
//     const result = await Schedulers.joinScheduler(req.params.scheduleID, req.body);
//     res.json(result);
//   } catch (error) {
//     res.status(500).json({ error });
//   }
// };

const handleGetSchedulers = async (req, res) => {
  try {
    const result = await Schedulers.getSchedulers();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const handleGetScheduler = async (req, res) => {
  try {
    const result = await Schedulers.getScheduler(req.params.scheduleID);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const handleUpdateScheduler = async (req, res) => {
  try {
    const result = await Schedulers.updateScheduler(req.params.scheduleID, req.body);
    res.json(result);
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

router.route('/users')
  .post(handleCreateUser)
  .get(handleGetUsers);

router.route('/users/:userID')
  .get(handleGetUserEvents);

router.route('/schedulers')
  .get(handleGetSchedulers)
  .post(handleCreateSchedule);

router.route('/schedulers/:scheduleID')
  .get(handleGetScheduler)
  .put(handleUpdateScheduler);

// router.route('/schedulers/:schedulerID/users/:userID')
//   .put(handleJoinSchedule);

export default router;
