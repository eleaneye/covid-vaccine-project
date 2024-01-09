<template>
  <div class="admin-panel">
    <b-badge>Admin</b-badge>
    <h4>Admin Panel</h4>
    <b-container>
      <b-row>
        <b-col>
          <b-button @click="getAllUsers">View All Users</b-button>
          <b-list-group>
            <b-list-group-item v-for="(user,k) in users" :key="k*100">
              <p>Name: {{ user.displayName }}</p>
              <b-list-group-item v-for="(time, i) in user.accessed" :key="i">
                <p>Time: {{ time }}</p>
              </b-list-group-item>
            </b-list-group-item>
          </b-list-group>
        </b-col>
        <b-col>
          <b-list-group>
            <b-list-group-item v-for="event in events" :key="event.event_id">
              <b-button @click="deleteEvent(event.event_id)">Delete Event</b-button>
              <h4>Symptom: {{ event.symptom }}</h4>
              <h4>Vaccine: {{ event.vaccine }}</h4>
              <h4>VERSID: {{ event.vaers_id }}</h4>
              <h5>Age: {{ event.age }}</h5>
              <h5>Sex: {{ event.sex }}</h5>
              <p>Adverse Event Description: {{ event.description }}</p>
            </b-list-group-item>
          </b-list-group>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "AdminPanel",
  props: {
    events: {
      type: Array,
      default: () => [],
    },
    users: {
      type: Object,
    },
  },
  methods: {
    async getAllUsers() {
      console.log(`EVENT: Getting all users`);
      this.$emit("get-all-users");
    },
    async deleteEvent(id) {
      console.log(`EVENT: Deleting event with id ${id}`);
      this.$emit("delete-event", id);
    },
  },
  data() {
    return {};
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@media only screen and (max-width: 600px) {
  .events-table {
    width: 100vw;
  }
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
