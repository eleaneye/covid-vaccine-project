<template>
  <div class="events-table">
    <b-table responsive striped hover :items="events" :fields="fields"></b-table>

    <!-- <b-list-group>
      <b-list-group-item v-for="(event, i) in events" :key="i">
        <h4>Symptom: {{ event.symptom }}</h4>
        <h4>Vaccine: {{ event.vaccine }}</h4>
        <h4>VERSID: {{ event.vaers_id }}</h4>
        <h5>Age: {{ event.age }}</h5>
        <h5>Sex: {{ event.sex }}</h5>
        <p>Adverse Event Description: {{ event.description }}</p>
      </b-list-group-item>
    </b-list-group> -->
  </div>
</template>

<script>
export default {
  name: "EventsTable",
  props: {
    events: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      // omit id field, for privacy reasons
      fields: [
        { key: "vaers_id", sortable: true },
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
