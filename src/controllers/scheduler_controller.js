import Scheduler from '../models/scheduler_model';
import { createEvent } from './event_controller';

// create an empty calendar to use to initialize scheduler
const start = 9; // start and end times hard coded for now
const end = 18;

const createBlankEvents = async () => {
  const timeList = [];
  for (let t = start; t < end + 1; t += 1) { // hours specified
    for (let b = 0; b < 4; b += 1) { // 15 minute increments (0 is on the dot, 1 is 15m, 2 is 30m, 3 is 45m)
      for (let d = 0; d < 7; d += 1) { // 7 days in week
        const timeString = `${String(d)}.${String(t)}.${String(b)}`;
        const timeItem = ({
          key: timeString, day: d, time: t, block: b, count: 0, available: [],
        });
        const temp = createEvent(timeItem);
        timeList.push(temp);
      }
    }
  }
  return Promise.all(timeList); // need this so return actual events and not promises
};

/* Scheduler is created with the creator's email and blank events from code above */
/* Update the main view's url to contain the calendar ID, so every calendar is different */
export async function createScheduler(schedulerInput) {
  const times = await createBlankEvents();
  const scheduler = new Scheduler();
  scheduler.creator = schedulerInput.creator;
  scheduler.title = schedulerInput.title;
  scheduler.events = times;
  try {
    const savedScheduler = await scheduler.save();
    return savedScheduler; // return scheduler
  } catch (error) {
    throw new Error(`create scheduler error: ${error}`);
  }
}

// updated after a user goes through authentication
// may not need this
// export async function joinScheduler(schedulerId, userInfo) {
//   // find the calendar user is supposed to fill out. Will be helpful in refactoring share... maybe??
//   const scheduler = await Scheduler.findById(schedulerId);
//   const newUserEmail = userInfo.email;
//   scheduler.users.push(newUserEmail); // emails are more unique than names
//   try {
//     const savedScheduler = await scheduler.save();
//     return savedScheduler; // return scheduler
//   } catch (error) {
//     throw new Error(`join scheduler error: ${error}`);
//   }
// }

// get a specific scheduler
export async function getScheduler(id) {
  try {
    const scheduler = await Scheduler.findById(id).populate('events');
    return scheduler;
  } catch (error) {
    throw new Error(`get scheduler error: ${error}`);
  }
}

export async function updateScheduler(id, schedulerFields) {
  try {
    const scheduler = await Scheduler.findById(id);
    scheduler.creator = schedulerFields.creator;
    scheduler.events = schedulerFields.events;
    const savedScheduler = await scheduler.save();
    return savedScheduler; // return scheduler
  } catch (error) {
    throw new Error(`update scheduler error: ${error}`);
  }
}

export async function getSchedulers() {
  try {
    const schedulers = await Scheduler.find();
    return schedulers;
  } catch (error) {
    throw new Error(`get schedulers error: ${error}`);
  }
}
