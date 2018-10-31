export default {
  methods: {
    appendErrorsMixin(errors, initialState) {
      const errorsObject = { ...initialState };

      errors.reverse().forEach(error => {
        const property = error.path[0]; // property is 'username' etc
        errorsObject[property] = error.message; // set error message as property value in object
      });

      return errorsObject;
    },
    toggleModalMixin(modal) {
      this.$store.dispatch('toggleModal', modal);
    }
  }
};
