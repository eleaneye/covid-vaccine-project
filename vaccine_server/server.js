/*
 * This represents a server that fetches data from the CDC WONDERS 
 * Vaccine Adverse Event Reporting System (VERS), using XML request,
 * Uploading cleaned & converted JSON data to Firebase DB for frontend use
 *
 * @author Eleane Ye
 * 
 */

// set up dependencies
const express = require('express');
const morgan = require('morgan');
const morganBody = require('morgan-body');
const cors = require('cors');
const querystring = require('querystring');
const fetch = require('node-fetch');
const url = require('url')
const fs = require('fs');
const xml2js = require('xml2js');
const util = require('util');

// import required variables
const vaersDataStore = require('./VAERSDataStore.js');

// set up generic server and start listening for requests
const app = express();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));

// set up middleware that logs all requests made to the server
app.use(morgan('\n\n:method :url :status :res[content-length] - :response-time ms'));
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
morganBody(app, {
  logRequestBody: true,
  logAllReqHeader: true,
  logResponseBody: true,
  logAllResHeader: true,
});

// set up authentication (handles CORS)
const auth = require('./authentication.js');
auth.setupAuthentication(app);

const adminEmailAddresses = ['dennisquan@gmail.com', 'dquan@cs.duke.edu', 'rcd@cs.duke.edu', 'eleaneye21@gmail.com'];

function extractUserId(req) {
  return req.user?.id || '<none>';
}

// simple function to factor out common code from the API methods
// async function getJSON(url, parameters) {
//   const response = await fetch(`${url}?${querystring.stringify(parameters)}`);
//   return response.json();
// }

async function fetchEvents() {
  var params = new url.URLSearchParams();
  params.append("accept_datause_restrictions", "true");
  var example = fs.readFileSync('request.xml', 'utf8');
  // console.log(example);
  params.append("request_xml", example);
  //console.log(params.toString());

  // get XML response from CDC WONDER database
  const response = await fetch('https://wonder.cdc.gov/controller/datarequest/D8', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    body: params.toString()
  }).then(response => {
    // console.log(response);
    return response;
  }).catch(err => {
    console.log(err);
  });

  const xml = await response.text();
  // const xml = fs.readFileSync('D76_Example1-resp.xml', 'utf8');
  const options = {
    mergeAttrs: true,
    trim: true,
    normalize: true,

  };
  // parse xml to json
  const jsonData = xml2js.parseStringPromise(xml, options)
    .then(result => {
      const extractedData = result['page']['response'][0]['data-table'][0]['r'];
      var jsonArray = [];

      extractedData.forEach(event => {
        // console.log(util.inspect(event, false, null));
        if (event.c[0].l) {
          var symptom = event.c[0].l[0];
        }
        if (event.c[1].l) {
          var vaers_id = event.c[1].l[0]
        }
        if (event.c[2].l) {
          var age = event.c[2].l[0]
        }
        if (event.c[3].l) {
          var vaccine = event.c[3].l[0]
        }
        if (event.c[4].l) {
          var sex = event.c[4].l[0]
        }
        if (event.c[5].tx) {
          var description = event.c[5].tx[0]
        }
        const jsonObject = {
          symptom: symptom,
          vaers_id: vaers_id,
          age: age,
          vaccine: vaccine,
          sex: sex,
          description: description
        };

        jsonArray.push(jsonObject);
      })
      // console.log(jsonArray);
      return jsonArray;
    }).catch(err => console.log(err));

  if (jsonData) {
    // var cleanedData = cleanJSON(jsonData);
    return jsonData;
  }
  // report invalid API data returned
  throw new Error(`ERROR: Invalid API data returned from CDC WONDER VAERS database.`);
}

// base endpoint
app.get('/', (req, res, next) => {
  res.status(200);
  res.send(`
    <p>This is the back-end for my CS290 final project</p>
    <a href="api/getData">GET sample JSON Data</a><br/>
    <a href="api/getEvents">POST request to CDC API</a><br/>
    <a href="api/getFirebaseData">GET Data from Firebase🔥</a><br/>
    <a href="api/auth/login">Login</a><br/>
    <a href="api/auth/logout">Logout</a><br/>
    <a href="api/user">GET logged in user information</a><br/>
    <a href="api/getAllUsers">GET all users from Firebase</a>`
  );
});

// return sample JSON data
app.get(
  '/api/getData',
  async (req, res, next) => {
    res.status(200);
    res.json(vaersDataStore.sampleData);
  }
);

// get data from CDC and then upload to firebase db
app.get(
  '/api/getEvents',
  async (req, res, next) => {
    const allEvents = await fetchEvents();
    await vaersDataStore.uploadData(allEvents);
    res.redirect('/api/getFirebaseData');
  }
);

app.get(
  '/api/getFirebaseData',
  async (req, res, next) => {
    const allEvents = await vaersDataStore.getData();
    res.status(200).json({
      message: "Successfully fetched events from firebase!",
      data: allEvents,
    });
  }
);

// API for getting information on the logged in user
app.get(
  '/api/user',
  async (req, res) => {
    // extract out the useful parts of the req.user object
    const id = extractUserId(req);
    const email = req.user?.emails ? req.user.emails[0].value : null;
    const posts = await vaersDataStore.getEventById(id);
    res.json({
      id,
      posts: posts,
      displayName: req.user?.displayName,
      email,
      isAdmin: adminEmailAddresses.includes(email),
      photo: req.user?.photos?.length >= 1 ? req.user.photos[0].value : null,
    });
  },
);

// testing new user endpoint
app.get(
  '/api/test',
  async (req, res, next) => {
    const sampleProfile = {
      displayName: "Fake User 1",
      id: "fakeuser1",
      emails: "fakeemail@email.com",
      photos: "fakephoto",
    };
    const allEvents = await vaersDataStore.checkUser(sampleProfile);
    res.status(200).json({
      message: "Testing if user exists in database",
      data: allEvents,
    });
  },
);

app.get(
  '/api/getAllUsers',
  async (req, res, next) => {
    const allUsers = await vaersDataStore.getUsers();
    res.status(200).json({
      message: "Returning all users stored in Firebase",
      data: allUsers,
    });
  },
);

app.post(
  '/api/post_event',
  async (req, res, next) => {
    const event = req.body;
    await vaersDataStore.createEvent(event);
    res.status(200).json({
      message: "Posted user submitted event report to Firebase"
    });

  }
);

// GET all user reported adverse events
app.get(
  '/api/getUserEvents',
  async (req, res, next) => {
    const userData = await vaersDataStore.getUserData();
    res.status(200).json({
      message: "Fetched user data from Firebase",
      data: userData,
    });
  }
);

// get event associated with user
app.get(
  '/api/getEventById/:id',
  async (req, res, next) => {
    console.log(req.params["id"]);
    const eventId = req.params["id"];
    const response = await vaersDataStore.getEventById(eventId);
    res.status(200).json({
      message: "Got user events by id",
      data: response,
    });
  }
);

app.delete(
  '/api/deleteEvent/:id',
  async (req, res, next) => {
    console.log(req.params["id"]);
    const eventId = req.params["id"];
    await vaersDataStore.deleteEvent(eventId);
    res.status(200).json({
      message: "Deleted user event from Firebase",
    });
  }
);






