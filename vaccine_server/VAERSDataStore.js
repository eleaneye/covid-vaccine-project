/*
 * This contains functions that perform read, write operations on Firebase DB
 * Called in endpoints defined in auth.js and server.js
 * 
 * @author Eleane Ye
 * @author Dennis Quan & Robert Duvall
 * 
 */

const admin = require('firebase-admin');
const { FIREBASE_CONFIG } = require('./secrets');

admin.initializeApp({
    credential: admin.credential.cert(FIREBASE_CONFIG),
    databaseURL: `https://${FIREBASE_CONFIG.project_id}-default-rtdb.firebaseio.com`,
});

const DB = admin.database();

module.exports = {
    dataRef: DB.ref('data'),
    usersRef: DB.ref('users'),
    userDataRef: DB.ref('userData'),

    // return all CDC data
    async getData() {
        console.log(`Getting data at ${this.getTimeStamp()}`);
        // NOT the data directly, get current snapshot of all data to process locally
        const snapshot = await this.dataRef.once('value');
        // console.log(snapshot);
        // return actual data held within snapshot (also has convenience functions like forEach to process the data)
        return snapshot.val();
        // note could catch possible errors here, but should be caught be "general" error middleware
    },
    // upload/write fetched data 
    async uploadData(jsonData) {
        // NOTE: set overwrites/replaces the entire data object
        await this.dataRef.set(jsonData);
        console.log("Fetched data from CDC WONDER and uploaded to firebase");
    },
    // basic utility to display the time in a readable format
    getTimeStamp() {
        return new Date().toISOString().slice(0, 19).replace('T', ' ');
    },
    // return all users
    async getUsers() {
        console.log(`Getting data at ${this.getTimeStamp()}`);
        const snapshot = await this.usersRef.once('value');
        console.log(snapshot);
        return snapshot.val();
    },
    // create new user
    async createUser(profile) {
        // var newUserRef = myUserRef.push();
        // get unique key generated for newly added user
        // const newUserId = newUserRef.key;
        // await newUserRef.set({
        //     userId: newUserId,
        //     accessed: timestampArray,
        //     ...profile
        // });
        var timestampArray = [];
        timestampArray.push(this.getTimeStamp())
        DB.ref('users/' + profile.id).set({
            accessed: timestampArray,
            ...profile
        });

        // await this.usersRef.push(profile);
        console.log("Created new user with profile", profile, "and id/key", profile.id);
    },
    // check if user already exists
    async userExists(profile) {
        console.log(`Getting data at ${this.getTimeStamp()}`);
        const snapshot = await this.usersRef.once('value');
        var found = false;
        snapshot.forEach((child) => {
            var key = child.key;
            var value = child.val();

            // user exists
            if (profile.id == key) {
                const timestampArray = value.accessed;
                timestampArray.push(this.getTimeStamp());

                DB.ref('users/' + profile.id).set({
                    accessed: timestampArray,
                    ...profile
                });
                // const updatedProfile = {
                //     accessed: timestampArray,
                //     ...profile
                // };

                console.log("User already exists in database");
                // add timestamp to existing array
                // value.timestampArray.push(this.getTimeStamp());
                // BUG: currently, code just iterates through entire snapshot
                // but should be return when id matches first time
                found = true;
                return;
            }
        });
        if (!found) {
            console.log("Go to create new user function");
            await this.createUser(profile);
        }
        return;
    },
    // write user submitted event
    async createEvent(event) {
        var newEventRef = this.userDataRef.push();
        var eventId = newEventRef.key;
        await newEventRef.set({
            event_id: eventId,
            ...event
        });
        // console.log("Event passed in to function is", event);
        // await this.userDataRef.push(event);
        console.log("Created new event in db:", event);
    },
    // fetch all user reported events
    async getUserData() {
        console.log(`Getting data at ${this.getTimeStamp()}`);
        const snapshot = await this.userDataRef.once('value');
        const eventsArray = [];
        snapshot.forEach(event => {
            eventsArray.push(event);
        })
        // console.log(snapshot);
        // return snapshot.val();
        return eventsArray;
    },
    async getEventById(id) {
        console.log(`Getting events associated with id:`, id);
        const snapshot = await this.userDataRef.once('value');
        const matches = []
        snapshot.forEach(child => {
            const value = child.val()
            if (value.vaers_id == id) {
                matches.push(child);
            }
        })
        // const matches = snapshot.filter(each => each.val().vaers_id == id);
        console.log("Matches", matches);
        return matches;
    },
    // get selected event by ID and delete
    async deleteEvent(id) {
        console.log(`Deleting event with id:`, id);
        const selectedEventRef = this.userDataRef.child(id);
        selectedEventRef.remove();
        return true;
        // this.userDataRef.child(id).remove();
    },
    sampleData: [
        {
            symptom: "ABDOMINAL DISTENSION",
            vaers_id: "1023948-1",
            age: "60-64",
            vaccine: "COVID19 (MODERNA)",
            sex: "F",
            description: "2 days after vaccine--Resident stated that she didn't feel good (She is developmentally delayed and less able to communicate how she feels than those in the community) and stopped eating most foods; also had fatigue. Vitals, coloring, & behavior were normal. 02/09/21--Belly was firm and mildly distended (although she stated it didn't hurt); she coded this evening and CPR was performed before EMT could transport her to the hospital. 02 / 10 / 21--Resident passed.",
        },
        {
            symptom: "AMNESIA",
            vaers_id: "1005704-1",
            age: "65+",
            vaccine: "COVID19 (MODERNA)",
            sex: "F",
            description: "Pt's son called and reported that pt had COVID vaccine on 1-25-21 and was taken to the hospital via EMS due to confusion and memory loss. Pt's son states that pt was diagnosed with 'TIA' and stayed in the hospital x 3 days. Pt states that the physicians at facility was not sure if TIA was related to vaccine but encouraged him to report adverse event. Pt's son states that pt has short term memory loss and has since moved in with him after this event happened.",
        },
        {
            symptom: "ANAPHYLACTIC REACTION",
            vaers_id: "0907173-1",
            age: "50-59",
            vaccine: "COVID19(PFIZER - BIONTECH)",
            sex: "F",
            description: "Anaphylaxis reaction with hives, stridor/ airway edema, wheezing",
        },
    ]
};