const jsonServer = require("json-server"); // importing json-server library
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 8080; //  chose port from here like 8080, 3001

server.use(middlewares);
server.use(router);

server.listen(port);

server.use((req, res, next) => {
  if (req.body && req.body.name) {
    if (req.body.name.length > 40) {
      return res.status(400).send("Name cannot exceed 40 characters.");
    }
  }
  next();
});