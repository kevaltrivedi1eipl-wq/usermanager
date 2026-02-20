const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 8080;

server.use(middlewares);
server.use(jsonServer.bodyParser); // Ensure body is parsed

// Custom validation middleware
server.use((req, res, next) => {
  if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
    const { name, username, email, phone, company, website } = req.body || {};

    if (name && name.length > 20) {
      return res.status(400).send("Name cannot exceed 20 characters.");
    }
    if (username && username.length > 15) {
      return res.status(400).send("Username cannot exceed 15 characters.");
    }
    if (email && email.length > 35) {
      return res.status(400,"exceed").send("Email cannot exceed 25 characters.");
    }
    if (phone && phone.length > 15) {
      return res.status(400).send("Phone number cannot exceed 15 characters.");
    }
    if (company && company.length > 20) {
      return res.status(400).send("Company name cannot exceed 20 characters.");
    }
    if(website && website.length > 30){
        return res.status(400).send("Website name cannot exceed 30 character");
    }
  }
  next();
});

server.use(router);

server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});   