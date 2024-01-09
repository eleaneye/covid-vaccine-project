const fetch = require('node-fetch');
const App = require('../pageobjects/app.page');

describe('Vue.js app', () => {
    it('should open and render', () => {
        App.open();

        // check for the bare minimum
        expect(App.myTitle).toHaveTextContaining('Filters');
    });
    it('should have a filter button', async () => {
        expect(App.myFilter).toHaveTextContaining('Filter!');
    });
    it('should get the default user profile', async () => {
        // use fetch to call the backend API directly
        const result = await fetch(`${browser.options.baseUrl}/api/user`);
        const json = await result.json();
        expect(json.email).toBe(null);
    });
    it('should get CDC data from Firebase', async () => {
        // use fetch to call the backend API directly
        const result = await fetch(`${browser.options.baseUrl}/api/getEvents`);
        const json = await result.json();
        const returnedData = json.data;
        const firstObject = returnedData[0];
        const exists = firstObject.hasOwnProperty('symptom');
        expect(exists).toBe(true);
    });
    it('should allow users to refresh data on page', async () => {
        App.open();

        App.clickRefresh();
        expect(App.myMessage).toHaveTextContaining("Successfully fetched events");
    });
    it('should allow users to filter events', async () => {
        App.open();
        
        App.clickFilter();

        expect(App.myFilteredResults).not.toHaveTextContaining("0");
    });
    // TODO: fix local-only redirecting to server not ui after login
    // it('should allow login as alice', () => {
    //     App.open();

    //     // wait for user to log in
    //     // NOTE: this part has to be achieved manually, since we don't want to save
    //     // usernames and passwords in source code
    //     App.clickLogin();
    //     expect(App.myEmailAddress).toHaveTextContaining('alice', {
    //         wait: 20000, // give the user 20 seconds to authenticate
    //     });

    //     // log out
    //     App.clickLogout();

    //     // verify that alice's name is no longer in the email address field
    //     expect(App.myEmailAddress).not.toHaveTextContaining('alice', {
    //         wait: 5000,
    //     });
    // });
    // it('should allow user to submit events', () => {
    //     const wait = 5000;
    //     App.open();

    //     const sampleEvent = {
    //         symptom: "Test Symptom",
    //         age: "65+ years",
    //         sex: "Female",
    //         vaccine: "COVID19(PFIZER - BIONTECH)",
    //         description: "Test description"
    //     }
    //     // submit sample event
    //     App.submitEvent(sampleEvent);

    //     // make sure UI reflects that color was set to blue
    //     // NOTE: the wait is necessary since the UI updates only after
    //     // the backend API is called, which may take a few seconds
    //     expect(App.userEvents).toHaveTextContaining('Test Symptom', { wait });
    // });
});
