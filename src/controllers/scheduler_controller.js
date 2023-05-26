import Scheduler from '../models/scheduler_model';

/* Main Page is where user creator selects days of interest */
/* Once they do, and click a bytton, maybe Create Event, scheduler is added to DB */
/* Scheduler is created with the creator's email, days of interest, and calendar ID */
/* That way, we can get the id of the scheduler on Click event */
/* Update the main view's url to contain the calendar ID, so every calendar is different */
export async function createScheduler(schedulerFields) {
  const scheduler = new Scheduler();
  scheduler.creator = schedulerFields.creator;
  scheduler.daysOfInterest = schedulerFields.daysOfInterest;
  scheduler.users = schedulerFields.users;
  scheduler.calendarID = schedulerFields.calendarID;
  try {
    const savedScheduler = await scheduler.save();
    return savedScheduler; // return scheduler
  } catch (error) {
    throw new Error(`create scheduler error: ${error}`);
  }
}

// updated after a user goes through authentication
export async function joinScheduler(schedulerId, userInfo) {
  // find the calendar user is supposed to fill out. Will be helpful in refactoring share... maybe??
  const scheduler = await Scheduler.findById(schedulerId);
  const newUserEmail = userInfo.email;
  scheduler.users.push(newUserEmail); // emails are more unique than names
  try {
    const savedScheduler = await scheduler.save();
    return savedScheduler; // return scheduler
  } catch (error) {
    throw new Error(`join scheduler error: ${error}`);
  }
}

// might be need for updating the url or not
export async function getSchedulerID(id) {
  try {
    const scheduler = await Scheduler.findById(id);
    return scheduler.calendarID;
  } catch (error) {
    throw new Error(`get scheduler error: ${error}`);
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
