const restify = require('restify');
const corsMiddleware = require('restify-cors-middleware');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const server = restify.createServer();

const settings = require('./settings');
const url = `mongodb://${settings.host}:${settings.port}/${settings.database}`;
const connection = MongoClient.connect(url, { useNewUrlParser: true }).catch(error => console.error(error));

const cors = corsMiddleware({
    origins: ['http://localhost:4200', 'http://localhost:3000']
});

server.pre(cors.preflight);
server.use(cors.actual);
server.use(restify.plugins.bodyParser());

// server.get('/api/contacts', (req, res) => {
//     connection.then(response => {
//         const responseDB = response.db(settings.database);
//         const contactsCollection = responseDB.collection(settings.collection);
//         return contactsCollection.find({}).toArray();
//     }).then(response => res.json(response))
//         .catch(error => console.error(error));
// });

// server.get('/api/contacts/:id', (req, res) => {
//     const objectID = req.params.id;
//     connection.then(response => {
//         const responseDB = response.db(settings.database);
//         const contactsCollection = responseDB.collection(settings.collection);
//         return contactsCollection.findOne(ObjectID(objectID));
//     })
//         .then(response => res.json(response))
//         .catch(error => console.error(error));
// });

// server.post('/api/contacts/:id', (req, res) => {
//     const objectID = req.params.id;
//     connection.then(response => {
//         const responseDB = response.db(settings.database);
//         const contactsCollection = responseDB.collection(settings.collection);
//         const contact = req.body;
//         return contactsCollection.replaceOne({ _id: ObjectID(objectID) }, contact);
//     })
//         .then(response => res.json(response))
//         .catch(error => console.error(error));
// });

// server.post('/api/contacts', (req, res) => {
//     connection.then(response => {
//         const responseDB = response.db(settings.database);
//         const contactsCollection = responseDB.collection(settings.collection);
//         const contact = req.body;
//         return contactsCollection.insertOne(contact);
//     })
//         .then(response => res.json(response))
//         .catch(error => console.error(error));
// });

// server.del('/api/contacts/:id', (req, res) => {
//     const objectID = req.params.id;
//     connection.then(response => {
//         const responseDB = response.db(settings.database);
//         const contactsCollection = responseDB.collection(settings.collection);
//         return contactsCollection.deleteOne({ _id: ObjectID(objectID) });
//     })
//         .then(response => res.json(response))
//         .catch(error => console.error(error));
// });

server.listen(3000, () => console.log('Magic happens on port 3000'));
