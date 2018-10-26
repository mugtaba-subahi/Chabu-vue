export default {
  methods: {
    bindInputMixin(property) {
      return () => {
        this.formValues[property] = event.target.value; // all inputs are stored in a 'formValues' object
      };
    },

    appendErrorsMixin(errors, initialState) {
      const formErrors = { ...initialState }; // get all properties of error object

      errors.reverse().forEach(error => {
        const property = error.path[0]; // property is 'username' etc
        formErrors[property] = error.message; // set error message as property value in object
      });

      return formErrors;
    }
  }
};
