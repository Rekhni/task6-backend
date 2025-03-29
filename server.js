const express = require('express');
const cors = require('cors');
const db = require('./firebase');
const { messaging } = require('firebase-admin');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5001;


app.use(cors());
app.use(express.json());

app.get('/api', (req, res) => {
    res.json({ message: 'Backend is running' });
});

app.get('/api/presentations', async (req, res) => {
    const ref = db.ref('presentations');
    ref.once('value', (snapshot) => {
        res.json(snapshot.val())
    });
});

app.post('/api/presentations', (req, res) => {
    const { id, title, creator } = req.body;
    const ref = db.ref(`presentations/${id}`);

    ref.set({
        title,
        creator,
        slides: [],
        users: [],
    }, (error) => {
        if (error) {
            res.status(500).send({ message: "Error creating presentation" });
        } else {
            res.status(201).send({ message: "Presentation created successfully" });
        }
    });
});

app.post('/api/users', (req, res) => {
    const { presentationId, userId, name, role } = req.body;

    const userRef = db.ref(`presentations/${presentationId}/users/${userId}`);

    userRef.set({ name, role }, (error) => {
        if (error) {
            res.status(500).send({ message: "Error adding user" });
        } else {
            res.status(201).send({ message: "User added successfully" });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})