// TODO: Populate the form values with data fetched by setting initial value
// may need to pass in prop for form values
<template>
  <FormulateForm
    class="login-form"
    v-model="formValues"
    @submit="submitHandler"
    #default="{ isLoading }"
  >
    <h2 class="form-title">Experienced an adverse reaction?</h2>
    <p>
      Use this form below to submit information & your symptoms to the database.
      This information will be made public. DISCLAIMER: Please do not put any
      sensitive or personally identifiable information as this is a project for
      demonstration purposes only. Data will not be sent to the CDC - if you
      would like to actually fill out a form, please fill out the official
      <a href="https://vaers.hhs.gov/esub/index.jsp"
        >CDC VAERS Adverse Event Reporting Form</a
      >.
    </p>
    <FormulateInput
      name="symptom"
      type="text"
      label="Your symptom"
      placeholder="Your symptom"
      validation="required"
    />
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
          value: 'COVID19(PFIZER - BIONTECH)',
          label: 'COVID19(PFIZER - BIONTECH)',
        },
        { value: 'COVID19 (MODERNA)', label: 'COVID19 (MODERNA)' },
        { value: 'COVID19 (COVID19 (JANSSEN))', label: 'COVID19 (JANSSEN)' },
      ]"
      type="select"
      placeholder="Select vaccine type"
    />
    <FormulateInput
      name="description"
      type="textarea"
      label="Adverse Event Description"
    />
    <FormulateInput
      type="submit"
      :disabled="isLoading"
      :label="isLoading ? 'Loading...' : 'Submit this form'"
    />
    <!-- <pre class="code" v-text="formValues" /> -->
  </FormulateForm>
</template>

<script>
export default {
  methods: {
    async submitHandler() {
      console.log(`EVENT: Submitting new data ${this.formValues}`);
      this.$emit("submit-event", this.formValues);
      alert(
        `Thank you, your submission has been received. View your submission at the 'Crowdsourced Data' tab.`
      );
    },
  },
  data() {
    return {
      formValues: {},
      message: "",
    };
  },
};
</script>

<style scoped>
.login-form {
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