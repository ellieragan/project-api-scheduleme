import Scheduler from '../models/scheduler_model';

/* Main Page is where user creator selects days of interest */
/* Once they do, and click a bytton, maybe Create Event, scheduler is added to DB */
/* Scheduler is created with the creator's email, days of interest, and calendar ID */
/* That way, we can get the id of the scheduler on Click event */
/* Update the main view's url to contain the calendar ID, so every calendar is different */
export async function createScheduler(schedulerFields) {
  const scheduler = new Scheduler();
  scheduler.creator = schedulerFields.creator;
  scheduler.users = schedulerFields.users;
  scheduler.events = schedulerFields.events;
  try {
    const savedScheduler = await scheduler.save();
    return savedScheduler; // return scheduler
  } catch (error) {
    throw new Error(`create scheduler error: ${error}`);
  }
}

// updated after a user goes through authentication
// may bnot neeed this
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
    const scheduler = await Scheduler.findById(id);
    return scheduler;
  } catch (error) {
    throw new Error(`get scheduler error: ${error}`);
  }
}

export async function updateScheduler(id, schedulerFields) {
  try {
    const scheduler = await Scheduler.findById(id);
    scheduler.creator = schedulerFields.creator;
    scheduler.users = schedulerFields.users;
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
