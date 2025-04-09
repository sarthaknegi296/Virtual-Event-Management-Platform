
const { createNewEvent, updateEvent, registerEvent, getEvents, deleteAnEvent } = require("../services/events");

const createEvent = async (req, res) => {
  const role = req.user.role;
  if (role != "organizer") {
    return res.status(403).json({ message: "Cannot create an event" });
  }

  const { title, date, time, description } = req.body;
  const username = req.user.username;
  try {
    const event = await createNewEvent(
      title,
      date,
      time,
      description,
      username
    );

    res.status(201).json({
      message: "Event created successfully",
      event: event,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating event",
      error: error.message,
    });
  }
};

const updateEvents = async (req, res) => {
  const role = req.user.role;
  const event = req.params.id;
  const organizer = req.user.username;

  if (role != "organizer") {
    return res.status(403).json({ message: "Cannot update the event" });
  }

  if (!event) {
    return res.status(400).json({ message: "Event ID is required" });
  }

  const { title, date, time, description } = req.body;

  try {
    const updatedEvent = await updateEvent(
      event,
      title,
      date,
      time,
      description,
      organizer
    );

    return res.status(200).json({
      message: "Event updated successfully",
      updatedEvent: updatedEvent,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error finding event", error: error.message });
  }
};

const registerEvents = async (req, res) => {
  const username = req.user.username;
  const event = req.params.id;
  if (!event) {
    return res.status(400).json({ message: "Event ID is required" });
  }
  try {
    await registerEvent(event, username);
    return res.status(200).json({
      message: "Registered for event successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error registering for event", error: error.message });
  }
};

const getMyEvents = async (req, res) => {
  const username = req.user.username;
  try {
    const events = await getEvents(username);
    return res.status(200).json({
      events: events.map((event) => ({
        id: event._id,
        title: event.title,
        date: event.date,
        time: event.time,
        description: event.description,
      })),
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching events", error: error.message });
  }
};


const deleteEvents = async (req, res) => {
  const role = req.user.role;
  const event = req.params.id;
  const organizer = req.user.username;

  if (role != "organizer") {
    return res.status(403).json({ message: "Cannot delete the event" });
  }
  
  if (!event) {
    return res.status(400).json({ message: "Event ID is required" });
  }

  try {
    const deletedEvent = await deleteAnEvent(event, organizer);
    return res.status(200).json({
      message: "Event deleted successfully",
      deletedEvent: deletedEvent,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error deleting event", error: error.message });
  }
}

module.exports = {
  createEvent,
  updateEvents,
  registerEvents,
  getMyEvents,
  deleteEvents,
};
