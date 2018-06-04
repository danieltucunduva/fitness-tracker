/*
Windows PowerShell commands
mongod --config="C:\MongoDB\mongo.config"
mongo --port 27017 --host localhost
node ./src/api/app.js
 */
const restify = require('restify');
const corsMiddleware = require('restify-cors-middleware');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const notifier = require('node-notifier');

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


// requests and routes ////////////////////////////////////////////////////////////////////////


/**
 * Finds one past sprint of user, if any
 */
server.post('/api/one-past-sprint', (req, res) => {
  connection
    .then(response => {
      const userId = req.body;
      const responseDB = response.db(settings.database);
      const sprintCollection = responseDB.collection(settings.sprint_collection);
      return sprintCollection.findOne({
        status: {
          $in: ['completed', 'cancelled']
        },
        user: userId
      })
    }).then(response => res.json(response))
    .catch(error => console.error(error));
});


/**
 * Finds all past sprints of user
 */
server.post('/api/past-sprints', (req, res) => {
  connection
    .then(response => {
      const userId = req.body;
      const responseDB = response.db(settings.database);
      const sprintCollection = responseDB.collection(settings.sprint_collection);
      return sprintCollection.find({
        status: {
          $in: ['completed', 'cancelled']
        },
        user: userId
      }).toArray();
    }).then(response => res.json(response))
    .catch(error => console.error(error));
});


/**
 * Finds all sprint types available for a user
 */
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


/**
 * Finds a sprint
 */
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


/**
 * Returns the default sprint
 */
server.get('/api/sprints/default-sprint', (req, res) => {
  const objectID = req.params.id;
  connection
    .then(response => {
      const responseDB = response.db(settings.database);
      const sprintCollection = responseDB.collection(settings.sprint_collection);
      return sprintCollection.find({
        recommended: true
      }).toArray();
    }).then(response => res.json(response))
    .catch(error => console.error(error));
});


/**
 * Creates a new sprint
 */
server.post('/api/sprints', (req, res) => {
  connection
    .then(response => {
      const responseDB = response.db(settings.database);
      const sprintCollection = responseDB.collection(settings.sprint_collection);
      const newSprint = req.body;
      console.log(newSprint);
      if (newSprint.status === 'completed' && newSprint.notify === true) {
        notifier.notify({
            icon: '../assets/logo_square.png',
            title: '≡Sprint',
            message: 'Your sprint is finished.',
            wait: true,
            icon: '../assets/logo_square.png',
            sound: true,
            timeout: 120,
            closeLabel: 'Ok'
          },
          function (err, data) {
            // Will also wait until notification is closed.
            console.log('Waited');
            console.log(err, data);
          }
        );
        notifier.on('timeout', function () {
          // console.log('Notification timed out!');
        });
        notifier.on('click', function () {
          // console.log('Notification clicked!');
        });
      }
      return sprintCollection.insertOne(newSprint);
    })
    .then(response => res.json(response))
    .catch(error => console.error(error));
});


/**
 * Checks if a username is free
 */
server.post('/api/users/check', (req, res) => {
  connection
    .then(response => {
      const responseDB = response.db(settings.database);
      const sprintCollection = responseDB.collection(settings.user_collection);
      const username = req.body;
      const userExists = sprintCollection.findOne({
        email: username
      });
      if (userExists) {
        return false;
      } else {
        return true;
      }
    })
    .then(response => res.json(response))
    .catch(error => {
      console.error(error);
      res.json(error)
    });
});


/**
 * Creates a new user
 */
server.post('/api/users', (req, res) => {
  connection
    .then(response => {
      const responseDB = response.db(settings.database);
      const sprintCollection = responseDB.collection(settings.user_collection);
      const newUser = req.body;
      return sprintCollection.insertOne(newUser);
    })
    .then(response => res.json(response))
    .catch(error => {
      console.error(error);
      res.json(error)
    });
});


/**
 * User login
 */
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
