<template>
  <div class="user-events-table">
    <b-table
      striped
      hover
      responsive
      :items="events"
      :fields="fields"
    ></b-table>
  </div>
  <!-- <b-list-group>
      <b-list-group-item v-for="event in events" :key="event.id">
        <b-button v-if="user.isAdmin" @click="deleteEvent(event.id)"
          >Delete Event</b-button
        >
        <h4>Symptom: {{ event.symptom }}</h4>
        <h4>Vaccine: {{ event.vaccine }}</h4>
        <h4>VERSID: {{ event.vaers_id }}</h4>
        <h5>Age: {{ event.age }}</h5>
        <h5>Sex: {{ event.sex }}</h5>
        <p>Adverse Event Description: {{ event.description }}</p>
      </b-list-group-item>
    </b-list-group> -->
</template>

<script>
export default {
  name: "UserEventsTable",
  props: {
    events: {
      type: Array,
      default: () => [],
    },
    user: Object,
  },
  methods: {
    deleteEvent(id) {
      console.log(`EVENT: Deleting user event ${id}`);
      this.$emit("delete-event", id);
    },
  },
  data() {
    return {
      // defines table cols and if sortable
      fields: [
        // { key: "vaers_id", sortable: true },
        { key: "symptom", sortable: true },
        { key: "age", sortable: true },
        { key: "sex", sortable: true },
        { key: "description", sortable: false },
      ],
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@media only screen and (max-width: 600px) {
  .user-events-table {
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
