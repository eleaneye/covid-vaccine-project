<template>
  <FormulateForm
    class="login-form"
    v-model="values"
    @submit="submitHandler"
    #default="{ isLoading }"
  >
    <h4 class="form-title">Filters</h4>
    <p>Filter returned events by age, gender, vaccine type.</p>
    <div class="double-wide">
      <FormulateInput
        name="sex"
        :options="[
          { value: 'Female', label: 'Female' },
          { value: 'Male', label: 'Male' },
        ]"
        type="select"
        placeholder="Select an option"
      />
      <FormulateInput
        name="age"
        :options="[
          { value: '18-29 years', label: '18-29 years' },
          { value: '30-39 years', label: '30-39 years' },
          { value: '40-49 years', label: '40-49 years' },
          { value: '50-59 years', label: '50-59 years' },
          { value: '60-64 years', label: '60-64 years' },
          { value: '65+ years', label: '65+ years' },
        ]"
        type="select"
        placeholder="Select age range"
      />
    </div>
    <FormulateInput
      name="vaccine"
      :options="[
        {
          value: 'COVID19 (COVID19 (PFIZER-BIONTECH))',
          label: 'COVID19(PFIZER - BIONTECH)',
        },
        { value: 'COVID19 (COVID19 (MODERNA))', label: 'COVID19 (MODERNA)' },
        { value: 'COVID19 (COVID19 (JANSSEN))', label: 'COVID19 (JANSSEN)' },
      ]"
      type="select"
      placeholder="Select vaccine type"
    />
    <FormulateInput
      type="submit"
      :disabled="isLoading"
      :label="isLoading ? 'Loading...' : 'Filter!'"
    />
    <!-- <pre class="code" v-text="values" /> -->
  </FormulateForm>
</template>

<script>
export default {
  methods: {
    async submitHandler() {
      console.log(`EVENT: Filtering data with ${this.values}`);
      this.$emit("filter-events", this.values);
    },
  },
  data() {
    return {
      values: {},
      //   schema: [
      //     {
      //       component: "h3",
      //       children: "Filter events",
      //     },
      //     {
      //       type: "select",
      //       label: "Vaccine type",
      //       name: "vaccine",
      //       placeholder: "Select a vaccine",
      //       options: {
      //         "COVID19 (COVID19 (PFIZER-BIONTECH))": "COVID19 (PFIZER-BIONTECH)",
      //         "COVID19 (COVID19 (MODERNA))": "COVID19 (MODERNA)",
      //         "COVID19 (COVID19 (JANSSEN))": "COVID19 (JANSSEN)",
      //       },
      //       validation: "required",
      //     },
      //     {
      //       component: "div",
      //       class: "flex-wrapper",
      //       children: [
      //         {
      //           name: "age",
      //           label: "Age range",
      //           type: "checkbox",
      //           options: {
      //             "18-29 years": "18-29 years",
      //             "30-39 years": "30-39 years",
      //             "40-49 years": "40-49 years",
      //             "50-59 years": "50-59 years",
      //             "60-64 years": "60-64 years",
      //             "65+ years": "65+ years",
      //           },
      //         },
      //         {
      //           name: "sex",
      //           label: "Sex",
      //           type: "checkbox",
      //           options: {
      //             Female: "Female",
      //             Male: "Male",
      //             Unknown: "Unknown",
      //           },
      //         },
      //       ],
      //     },
      //     {
      //       type: "submit",
      //       label: "Filter events",
      //     },
      //   ],
    };
  },
};
</script>

<style scoped>
.filter-form {
  padding: 2em;
  border: 1px solid #a8a8a8;
  border-radius: 0.5em;
  max-width: 500px;
  box-sizing: border-box;
}
.form-title {
  margin-top: 0;
}
.login-form::v-deep .formulate-input .formulate-input-element {
  max-width: none;
}
@media (min-width: 420px) {
  .double-wide {
    display: flex;
  }
  .double-wide .formulate-input {
    flex-grow: 1;
    width: calc(50% - 0.5em);
  }
  .double-wide .formulate-input:first-child {
    margin-right: 0.5em;
  }
  .double-wide .formulate-input:last-child {
    margin-left: 0.5em;
  }
}
</style>