Virtual Event Management Platform

A Node.js backend system for managing virtual events, built with Express.js and MongoDB using Mongoose. It supports secure user authentication, event creation, registration, updates, and deletion.

🚀 Tech Stack

Backend: Node.js, Express.js

Database: MongoDB (via Mongoose)

Authentication: JWT + bcrypt

🔐 Authentication

JWT-based authentication with role-based access:

Roles: organizer, attendee

📚 API Endpoints

🔸 Register user

POST /api/register 

Registers a new user (organizer or attendee)

🔸 Login

POST /api/login 

Logs in the user and returns a JWT token.

Event Routes

🔐 Requires Authorization header with JWT token

🔸 Create Event (organizers only)

POST /api/events

🔸 Update Event (organizer only)

PUT /api/events/:id

Only the organizer who created the event can update it.

🔸 Delete Event (organizer only)

DELETE /api/events/:id

Deletes an event. Only accessible by the original organizer.

🔸 Register for an Event

POST /api/events/:id/register

Allows an attendee to register for an event.

🔸 View Your Registered Events

GET /api/myevents

Lists all events where the logged-in user is a participant.


📌 Notes

Organizer verification on update and delete is enforced using their stored username and roles.

Passwords are securely hashed using bcrypt.

JWT is used for session authentication.

MongoDB stores all data using Mongoose models.
