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

const companies = [
  {
    id: 1,
    name: "Tech Corp",
    industry: "Technology",
    location: "New York",
    founded: 2010,
  },
  {
    id: 2,
    name: "Green Energy",
    industry: "Renewable Energy",
    location: "California",
    founded: 2015,
  },
  {
    id: 3,
    name: "Global Logistics",
    industry: "Transportation",
    location: "Chicago",
    founded: 2005,
  },
];

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the API" });
});

// User routes
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

// Company routes
app.get("/api/companies", (req, res) => {
  res.json(companies);
});

app.get("/api/companies/:id", (req, res) => {
  const company = companies.find((c) => c.id === parseInt(req.params.id));
  if (!company) {
    return res.status(404).json({ message: "Company not found" });
  }
  res.json(company);
});

describe("API Endpoints", () => {
  test("GET / should return welcome message", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: "Welcome to the API" });
  });

  // User endpoint tests
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

  // Company endpoint tests
  test("GET /api/companies should return all companies", async () => {
    const response = await request(app).get("/api/companies");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(companies);
  });

  test("GET /api/companies/:id should return specific company", async () => {
    const response = await request(app).get("/api/companies/1");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(companies[0]);
  });

  test("GET /api/companies/:id should return 404 for non-existent company", async () => {
    const response = await request(app).get("/api/companies/999");
    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({ message: "Company not found" });
  });
});
