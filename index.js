const jsonServer = require("json-server"); // importing json-server library
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 8080; //  chose port from here like 8080, 3001

server.use(middlewares);
server.use(router);

server.listen(port);

server.use((req, res, next) => {
  if (req.body && req.body.description) {
    if (req.body.description.length > 500) {
      return res.status(400).send("Description cannot exceed 500 characters.");
    }
  }
  next();
});