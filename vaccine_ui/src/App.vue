<template>
  <div id="app">
    <!-- navbar -->
    <b-navbar type="dark" variant="info">
      <b-navbar-brand href="#">Vaccine Adverse Events</b-navbar-brand>
      <b-navbar-nav class="ml-auto">
        <b-avatar :src="user.photo" v-if="user.photo" />
      </b-navbar-nav>
      <b-navbar-nav>
        <b-nav-item :href="apiUrlBase + 'api/auth/login'">Login</b-nav-item>
        <b-nav-item :href="apiUrlBase + 'api/auth/logout'">Logout</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <h5>{{ message }}</h5>
    <p>
      This project accesses CDC WONDER's API to return unverified, user
      submitted data from their Vaccine Adverse Reporting System (VAERS)
      database, with a specific focus on COVID-19 vaccines. Data is provided by
      <a href="https://wonder.cdc.gov/vaers.html">CDC WONDER</a> and is not
      filtered initially. If you would like to submit your own symptoms, please
      login!
    </p>
    <!-- filter options & user buttons-->
    <FormFilter @filter-events="filterEvents" /><br />
    <!-- tabs -->
    <div>
      <b-tabs content-class="mt-3">
        <b-tab title="CDC Data" active>
          <!-- summary stats -->
          <h6>Number of filtered results: {{ numEvents }}</h6>
          <h6>Total events: {{ totalEvents }}</h6>
          <b-button @click="refreshData"
            >Refresh CDC Data (updated every Friday)</b-button
          >
          <EventsTable :events="filteredEvents"
        /></b-tab>
        <b-tab title="Crowdsourced Data">
          <b-button @click="getUserEvents">Refresh</b-button>
          <div v-if="userEvents == {}">
            <p>
              No submissions yet. If you would like to add to this database,
              please login first.
            </p>
          </div>
          <div v-else>
            <UserEventsTable
              :events="userEvents"
              :user="user"
              @delete-event="deleteEvent"
            />
          </div>
        </b-tab>
        <b-tab title="My Profile">
          <div v-if="!user.displayName">
            <p>Please login to see additional functionality</p>
          </div>
          <div v-if="user.isAdmin">
            <AdminPanel
              :events="userEvents"
              :users="allUsers"
              @get-all-users="getAllUsers"
              @delete-event="deleteEvent"
            />
          </div>
          <div v-if="user.displayName">
            <b-table :items="[user]" stacked />
            <h4>Your submissions:</h4>
            <br />
            <b-table :items="user.posts" />
          </div>
        </b-tab>
        <b-tab title="Report Adverse Event" v-if="user.displayName">
          <FormReport @submit-event="submitEvent" />
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>
 
<script>
import EventsTable from "./components/EventsTable.vue";
import UserEventsTable from "./components/UserEventsTable.vue";
import FormReport from "./components/FormReport.vue";
import FormFilter from "./components/FormFilter.vue";
import AdminPanel from "./components/AdminPanel.vue";
import sampleDataStore from "./sampleDataStore.js";
import { getJSON } from "./apiHelper";

export default {
  name: "App",
  components: {
    EventsTable,
    UserEventsTable,
    FormReport,
    FormFilter,
    AdminPanel,
  },
  data() {
    return {
      // change this to access server deployed locally or remotely
      useRemoteServer: true,
      // message to display while waiting for data
      message: "Hello.",
      // set URL based on .env variable
      apiUrlBase: process.env.VUE_APP_SERVER_API_BASE,
      events: null,
      sampleEvents: null,
      userEvents: null,
      filteredEvents: null,
      numEvents: null,
      totalEvents: null,
      user: {},
      allUsers: {},
    };
  },
  methods: {
    // get data saved in firebase
    async getServerData() {
      const url = `${this.apiUrlBase}api/getFirebaseData`;
      console.log(url);
      const response = await fetch(url, { credentials: "include" });
      const serverData = await response.json();
      // console.log(serverData);

      // ensure valid response (HTTP-status is 200-299)
      // and expected data (not error JSON object)
      if (response.ok && serverData) {
        // convert server data into Vue data or update existing Vue data
        this.events = serverData.data;
        this.filteredEvents = serverData.data;
        this.totalEvents = serverData.data.length;
        this.message = serverData.message;
      }
    },
    async getSampleData() {
      this.sampleEvents = sampleDataStore.data;
      // console.log(this.sampleEvents);
    },
    async refreshData() {
      const url = `${this.apiUrlBase}api/getEvents`;
      console.log(url);
      const response = await fetch(url, { credentials: "include" });
      const serverData = await response.json();

      // ensure valid response (HTTP-status is 200-299)
      // and expected data (not error JSON object)
      if (response.ok && serverData) {
        // update existing Vue data
        this.events = serverData.data;
        this.filteredEvents = serverData.data;
        this.totalEvents = serverData.data.length;
        this.message = serverData.message;
      }
    },
    // helper for flattening array
    extractArray: function (array, newarray) {
      if (!newarray) newarray = [];
      if (array)
        for (var i = 0; i < array.length; ++i) {
          if (array[i].constructor.name === "Array")
            this.extractArray(array[i], newarray);
          else newarray.push(array[i]);
        }
      return newarray;
    },
    // filter events
    filterEvents: function (filters) {
      var keys = Object.keys(filters);
      var arrayvalues = Object.values(filters);
      var values = this.extractArray(arrayvalues); // call helper to flatten

      console.log("Filter keys", keys);
      console.log("Filter values", values);

      var result = this.events.filter(function (e) {
        return keys.every(function (a) {
          return values.includes(e[a]);
        });
      });
      this.numEvents = result.length;
      console.log(result);
      this.filteredEvents = result;
      // this.filteredEvents = this.events.filter((event) => {
      //   return this.checkedNames.indexOf(event.sex) != -1;
      // });
    },
    // api helper for calling /api/post_event
    async submitEvent(event) {
      const userEvent = {
        vaers_id: this.user.id,
        ...event,
      };
      console.log("Event to submit is:", userEvent);
      const url = `${this.apiUrlBase}api/post_event`;
      const options = {
        method: "POST",
        body: JSON.stringify(userEvent),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      };
      // send POST request
      fetch(url, options)
        .then((res) => res.json())
        .then((res) => (this.message = res.message));

      // refresh user events
      await this.getUserEvents();
      console.log("All user events", this.userEvents);
    },
    // get user submitted events
    async getUserEvents() {
      const url = `${this.apiUrlBase}api/getUserEvents`;
      console.log(url);
      const response = await fetch(url, { credentials: "include" });
      const serverData = await response.json();

      // ensure valid response (HTTP-status is 200-299)
      // and expected data (not error JSON object)
      if (response.ok && serverData) {
        this.userEvents = serverData.data;
        this.message = serverData.message;
      }
    },
    // admin function: delete events
    async deleteEvent(id) {
      const url = `${this.apiUrlBase}api/deleteEvent/${id}`;
      const options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      };

      const response = await fetch(url, options);
      const serverData = await response.json();

      if (response.ok && serverData) {
        this.message = serverData.message;
      }
      // refresh user events
      await this.getUserEvents();
      await this.refreshMe();
    },
    // admin: view all users and times accessed
    async getAllUsers() {
      const url = `${this.apiUrlBase}api/getAllUsers`;
      console.log(url);
      const response = await fetch(url, { credentials: "include" });
      const serverData = await response.json();

      // ensure valid response (HTTP-status is 200-299)
      // and expected data (not error JSON object)
      if (response.ok && serverData) {
        this.allUsers = serverData.data;
        this.message = serverData.message;
      }
    },
    // get user data
    async refreshMe() {
      this.user = await getJSON(this.apiUrlBase, "api/user");
    },
    // helper to refresh data in firebase, called on mounted
    async refreshAll() {
      await this.refreshMe();
      await this.getUserEvents();
      await this.getServerData();
    },
  },
  async mounted() {
    this.refreshAll();
  },
};
</script>

