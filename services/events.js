const Event = require("../models/events");

const createNewEvent = async (title, date, time, description, username) => {
  const newEvent = await Event.create({
    title,
    date,
    time,
    description,
    organizer: username,
  });
  return newEvent;
};

const updateEvent = async (event, title, date, time, description, organizer) => {
  const updatedEvent = await Event.findById(event);
  if (!updatedEvent) {
    return res.status(404).json({ message: "Event not found" });
  }
  if (updatedEvent.organizer !== organizer) {
    return res.status(403).json({
      message: "Not authorised to update this event",
    });
  }
  updatedEvent.title = title || updateEvent.title;
  updatedEvent.date = date || updateEvent.date;
  updatedEvent.time = time || updateEvent.time;
  updatedEvent.description = description || updateEvent.description;

  await updatedEvent.save();

  return updatedEvent;
};

const registerEvent = async (event, username) => {
  const eventToRegister = await Event.findById(event);
  if (!eventToRegister) {
    return res.status(404).json({ message: "Event not found" });
  }
  if (eventToRegister.participants.includes(username)) {
    return res
      .status(400)
      .json({ message: "Already registered for this event" });
  }
  eventToRegister.participants.push(username);
  await eventToRegister.save();
};

const getEvents = async (username) => {
  const events = await Event.find({ participants: username });
  if (!events) {
    return res.status(404).json({ message: "No events found" });
  }
  return events;
};

const deleteAnEvent = async (event, organizer) => {
  const eventToDelete = await Event.findById(event);
  if(eventToDelete.organizer !== organizer) {
    return res.status(403).json({
      message: "Not authorised to delete this event",
    });
  }
  
  const deletedEvent = await Event.findByIdAndDelete(event);
  if (!deletedEvent) {
   return res.status(404).json({ message: "Event not found" });
  }
  return deletedEvent;
}

module.exports = {
  createNewEvent,
  updateEvent,
  registerEvent,
  getEvents,
  deleteAnEvent,
};
