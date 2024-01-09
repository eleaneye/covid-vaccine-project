# Final Project

## Name: 
Eleane Ye

### How to use

To run server:
```
cd vaccine_server/
npm install
npm run start OR npm run local-only-with-google-auth
```

To run front-end:
```
cd vaccine_ui/
npm install
npm run serve
```

To do e2e tests with wdio:
Test users/passwords (if any) are located in the vaccine_server/secrets.js or authentication.js files
```
cd vaccine_ui/
npm run test:e2e -- --mode development
```

### About the data

The Vaccine Adverse Event Reporting System (VAERS) database contains information on unverified reports of adverse events (illnesses, health problems and/or symptoms) following immunization with US-licensed vaccines. Reports are accepted from anyone and can be submitted electronically at [www.vaers.hhs.gov](www.vaers.hhs.gov).

Data fetched from CDC WONDERS VAERS is stored in Google Firebase real-time database, with the JSON structure
```
 const sampleEvent = {
        symptom: "Test Symptom",
        age: "65+ years",
        sex: "Female",
        vaccine: "COVID19(PFIZER - BIONTECH)",
        description: "Test description",
        vaers_id: "867890",
    }
```

User submitted events are stored in firebase with the profile id as key and an extra field event_id to identify user associated events
```
 const userEvent = {
        symptom: "Test Symptom",
        age: "18-29 years",
        sex: "Male",
        vaccine: "COVID19(PFIZER - BIONTECH)",
        description: "Test description",
        vaers_id: "867890",
        event_id: "7342381904395892",
    }
```

### User types
This project distingushes between three user types:
1. Guest - allowed to view and filter all events
2. User - allowed to submit their own events
3. Admin - can view all users and also delete user submitted events

User profiles are also stored in firebase's real-time database with array accessed to keep track of login timestamps.

### Error checking
- Server checks for bad or invalid responses by making sure the http response code returned is ok
- UI checks against bad user input in submitting form data with Vue Formulate

### Technologies used
1. [Vue Formulate](https://vueformulate.com/) was used to collect form data for event submission as well as filtering. This made it easier to handle the v-model for several inputs, and also add some extra checks for bad input
2. [WebDriverIO](https://webdriver.io/docs/gettingstarted) was used for end-to-end unit testing; decision was made since this was discussed in class and I am unfamiliar with the other various options


### Assignment Notes

Known Bugs:
- Testing login locally redirects to localhost:3000 backend instead of the localhost:8080 frontend

Future Work that I was considering:
- Implementing universal fuzzy search with Vue Fuse (to allow users to search through all symptoms or descriptions)
- Allowing for more filters and data to be returned


