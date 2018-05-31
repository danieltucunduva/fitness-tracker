/*
MongoDB Windows PowerShell commands
mongod --config="C:\MongoDB\mongo.config"
mongo --port 27017 --host localhost
 */
const restify = require('restify');
const corsMiddleware = require('restify-cors-middleware');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const server = restify.createServer();

const settings = require('./settings');
const url = `mongodb://${settings.host}:${settings.port}/${settings.database}`;
const connection = MongoClient.connect(url, {
  useNewUrlParser: true
}).catch(error => console.error(error));

const cors = corsMiddleware({
  origins: ['http://localhost:4200', 'http://localhost:3000']
});

server.pre(cors.preflight);
server.use(cors.actual);
server.use(restify.plugins.bodyParser());

function runServer() {
  server.listen(3000, () => console.info('Magic happens on port 3000'));
}


/*
 requests and routes
 */
server.get('/api/past-sprints', (req, res) => {
  connection
    .then(response => {
      const responseDB = response.db(settings.database);
      const sprintCollection = responseDB.collection(settings.sprint_collection);
      return sprintCollection.find({
        status: {
          $in: ['completed', 'cancelled']
        }
      }).toArray();
    }).then(response => res.json(response))
    .catch(error => console.error(error));
});


server.post('/api/available-sprints', (req, res) => {
  connection
    .then(response => {
      const userId = req.body;
      const responseDB = response.db(settings.database);
      const sprintCollection = responseDB.collection(settings.sprint_collection);
      return sprintCollection.find({
        status: {
          $in: ['default', 'custom']
        },
        user: {
          $in: [null, userId]
        },
      }).toArray();
    }).then(response => res.json(response))
    .catch(error => console.error(error));
});

server.get('/api/sprints/:id', (req, res) => {
  const objectID = req.params.id;
  connection
    .then(response => {
      const responseDB = response.db(settings.database);
      const sprintCollection = responseDB.collection(settings.sprint_collection);
      return sprintCollection.findOne(ObjectID(objectID));
    })
    .then(response => res.json(response))
    .catch(error => console.error(error));
});

server.post('/api/sprints', (req, res) => {
  connection
    .then(response => {
      const responseDB = response.db(settings.database);
      const sprintCollection = responseDB.collection(settings.sprint_collection);
      const newSprint = req.body;
      return sprintCollection.insertOne(newSprint);
    })
    .then(response => res.json(response))
    .catch(error => console.error(error));
});

server.post('/api/users', (req, res) => {
  connection
    .then(response => {
      const responseDB = response.db(settings.database);
      const sprintCollection = responseDB.collection(settings.user_collection);
      const newUser = req.body;
      return sprintCollection.insertOne(newUser);
    })
    .then(response => res.json(response))
    .catch(error => console.error(error));
});

server.post('/api/login', (req, res) => {
  connection
    .then(response => {
      const responseDB = response.db(settings.database);
      const sprintCollection = responseDB.collection(settings.user_collection);
      const user = req.body;
      return sprintCollection.find({
        email: user.email,
        password: user.password,
      }).toArray();
    }).then(response => res.json(response))
    .catch(error => console.error(error));
});

runServer();
