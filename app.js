// const { json } = require('body-parser');
const express = require('express');
// const { emit } = require('npm');
const app = express();
app.use(express.static('client'));
app.use(express.json()); // Parse JSON encoded bodies

const crosscountry = {};
crosscountry.name = 'Cross Country';
crosscountry.date = '17/08/2021';
crosscountry.time = '13:00';
crosscountry.location = 'Vale of Belvoir';
crosscountry.description = 'Grade 5 entry. 10km. Starts in Upper Broughton and finishes in Stathern';
crosscountry.status = 'Go to Event';
crosscountry.commenttext = 'Show Comments:';
crosscountry.comments = ['Gwen - Stacy and I have signed up, so excited!', 'M - Looking forward to going.'];

const ironman = {};
ironman.name = 'Iron Man';
ironman.date = '25/09/2021';
ironman.time = '07:00';
ironman.location = 'East Midlands';
ironman.description = 'Swim at Rutland Waters, followed by bike ride to Newark then run to Sleaford. £100 entry payable 14 days in advance of event.';
ironman.status = 'Go to Event';
ironman.commenttext = 'Show Comments:';
ironman.comments = ['Mike - Will have to get some training on then...', 'Andy - Who is the fee payable to?'];

const cakecontest = {};
cakecontest.name = 'Cake Contest';
cakecontest.date = '02/09/2021';
cakecontest.time = '12:00';
cakecontest.location = 'Bakewell Village Hall';
cakecontest.description = 'Fun for all, entry fee of £5.';
cakecontest.status = 'Go to Event';
cakecontest.commenttext = 'Show Comments:';
cakecontest.comments = ['Joyce - Are there any buses from Coopers Chase?', 'Steven - Do you have to wear a mask?'];

const object1 = {};
const object2 = {};
const object3 = {};
const object4 = {};
const object5 = {};
const object6 = {};
const object7 = {};
const object8 = {};

const events = [crosscountry.name, ironman.name, cakecontest.name];
const initialEvents = [crosscountry.name.toLowerCase().trim().replace(/\s/g, ''), ironman.name.toLowerCase().trim().replace(/\s/g, ''), cakecontest.name.toLowerCase().trim().replace(/\s/g, '')];
const listOfObjects = [object1, object2, object3, object4, object5, object6, object7, object8];
const listOfObjectsDup = [object1, object2, object3, object4, object5, object6, object7, object8];

app.get('/event/list', function (req, resp) {
    resp.json(events);
});

app.post('/event/:ev/add', function (req, resp) {
    const status = req.body.status;
    const ev = req.params.ev;

    if (initialEvents.includes(ev)) {
        const evV = eval(ev);
        if (status === 'join') {
            evV.status = 'Going to Event, click to cancel Event.';
        } else if (status === 'not') {
            evV.status = 'Go to Event';
        }
        resp.json(evV);
    } else {
        for (const object of listOfObjects) {
            if (object.name.toLowerCase() === ev.toLowerCase()) {
                if (status === 'join') {
                    object.status = 'Going to Event, click to cancel Event.';
                } else if (status === 'not') {
                    object.status = 'Go to Event';
                }
                const returnArray = { name: object.name, date: object.date, time: object.time, location: object.location, description: object.description, status: object.status, comments: object.comments };
                resp.json(returnArray);
                break;
            }
        }
    }
});

app.get('/event/:ev', function (req, resp) {
    const ev = req.params.ev;

    if (initialEvents.includes(ev)) {
        const evV = eval(ev);
        resp.json(evV);
    } else {
        for (const object of listOfObjects) {
            if (object.name.toLowerCase() === ev.toLowerCase()) {
                const returnArray = { name: object.name, date: object.date, time: object.time, location: object.location, description: object.description, status: object.status, comments: object.comments };
                resp.json(returnArray);
                break;
            }
        }
    }
});

app.get('/event/:ev/comments', function (req, resp) {
    const ev = req.params.ev;

    if (initialEvents.includes(ev)) {
        const evV = eval(ev);
        resp.json(evV.comments);
    } else {
        for (const object of listOfObjects) {
            if (object.name.toLowerCase() === ev.toLowerCase()) {
                const returnArray = object.comments;
                resp.json(returnArray);
                break;
            }
        }
    }
});

app.post('/event/:ev/comments/add', function (req, resp) {
    const ev = req.params.ev;

    if (initialEvents.includes(ev)) {
        const evV = eval(ev);
        const newComment = req.body.newComment;
        evV.comments.push(newComment);
        resp.json(evV.comments);
    } else {
        for (const object of listOfObjects) {
            if (object.name.toLowerCase() === ev.toLowerCase()) {
                const newComment = req.body.newComment;
                object.comments.push(newComment);
                resp.json(object.comments);
                break;
            }
        }
    }
});

app.post('/event/create', function (req, resp) {
    const eventName = req.body.eventName;
    const eventDate = req.body.eventDate;
    const eventTime = req.body.eventTime;
    const eventLocation = req.body.eventLocation;
    const eventDescription = req.body.eventDescription;

    events.push(eventName);

    const object = listOfObjectsDup[0];

    object.name = eventName;
    object.date = eventDate;
    object.time = eventTime;
    object.location = eventLocation;
    object.description = eventDescription;
    object.status = 'Going to Event, click to cancel Event.';
    object.comments = [];

    listOfObjectsDup.shift();

    resp.json(object);
});

module.exports = app;
