const request = require("supertest");
const express = require("express");
const cors = require("cors");

// Import the app configuration
const app = express();
app.use(cors());
app.use(express.json());

// Static data
const users = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com" },
];

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Pipeline API" });
});

app.get("/api/users", (req, res) => {
  res.json(users);
});

app.get("/api/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json(user);
});

describe("API Endpoints", () => {
  test("GET / should return welcome message", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: "Welcome to the Pipeline API" });
  });

  test("GET /api/users should return all users", async () => {
    const response = await request(app).get("/api/users");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(users);
  });

  test("GET /api/users/:id should return specific user", async () => {
    const response = await request(app).get("/api/users/1");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(users[0]);
  });

  test("GET /api/users/:id should return 404 for non-existent user", async () => {
    const response = await request(app).get("/api/users/999");
    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({ message: "User not found" });
  });
});
