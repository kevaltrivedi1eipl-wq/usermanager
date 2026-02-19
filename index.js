const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 8080;

// Apply default middlewares first (logger, cors, etc.)
server.use(middlewares);

// Use bodyParser before any middleware that needs to read req.body
server.use(jsonServer.bodyParser);

// Add custom validation middleware BEFORE the router
server.use((req, res, next) => {
  // Only validate for POST/PUT/PATCH requests
  if ((req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') && req.body && req.body.name) {
    if (req.body.name.length > 40) {
      return res.status(400).send("Name cannot exceed 40 characters.");
    }
  }
  next();
});

// Mount the router last
server.use(router);

// Start the server
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});   