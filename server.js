const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

// Middleware
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

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
