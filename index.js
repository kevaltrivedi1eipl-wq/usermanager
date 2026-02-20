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
    if (req.body.name.length > 20) {
      return res.status(400).send("Name cannot exceed 40 characters.");
    }
    else if(res.body.username.length >15 ){
        return res.status(400).send("Username cannot exceed 15 character.")
    }
    else if(res.body.email.length > 25 ){
        return res.status(400).send("Email cannot exceed 15 character")
    }
    else if(res.body.phone.length > 15){
        return res.status(400).send("Phone Numbers exceed 15 character ")
    }
    else if(res.body.company.length > 20){
        return res.status(400).send("Company length exceed 20 character")
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