const express = require('express');
const server = express();

server.get('*', (req, res) => {
    res.send('Star');
})

server.get('/api/contacts', (req, res) => {
    connection.then(response => {
        const responseDB = response.db(settings.database);
        const contactsCollection = responseDB.collection(settings.collection);
        return contactsCollection.find({}).toArray();
    }).then(response => res.json(response))
        .catch(error => console.error(error));
});

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
