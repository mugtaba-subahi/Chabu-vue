<template>
  <form class="form" v-on:submit.prevent="submit">
    <h1 class="company">Chabu</h1>
    <h2 class="title">Login</h2>
    <ErrorableInput :error="formErrors.username">
      <input type="text" placeholder="Username" v-model="formValues.username" required>
    </ErrorableInput>
    <ErrorableInput :error="formErrors.password">
      <input type="password" placeholder="Password" v-model="formValues.password" required>
    </ErrorableInput>
    <ButtonWithLoader class="submit" :buttonType="'primary'" :text="'Login'" :loading="loginLoader"/>
  </form>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

import ErrorableInput from '../components/ErrorableInput.vue';
import ButtonWithLoader from '../components/ButtonWithLoader.vue';

import { server } from '../config';
import mixins from '../mixins';

@Component({
  components: { ErrorableInput, ButtonWithLoader },
  mixins: [mixins]
})
export default class Login extends Vue {
  formValues = { username: 'sleepy', password: '12345678' };
  formErrors = { username: '', password: '' };
  loginLoader = false;

  // methods
  resetErrors() {
    this.formErrors = { username: '', password: '' };
  }

  async submit() {
    this.loginLoader = true;
    this.resetErrors();

    const response = await server.post('login', this.formValues).catch(error => error.response);
    const { data, errors, ok } = response.data;

    if (!response) {
      this.loginLoader = false;
      return;
    }

    if (!ok) {
      this.formErrors = mixins.methods.appendErrorsMixin(errors, this.formErrors);
      this.loginLoader = false;
      return;
    }

    console.log(response);

    this.loginLoader = false;
    this.$store.dispatch('setAccountID', data.accountID);
    this.$router.push('/joined-rooms');
  }
}
</script>

<style lang="less" scoped>
@import (reference) '../styles/index.less';

.form {
  padding: @size-4;
  height: 100%;
  display: grid;
  grid-template-rows: repeat(4, max-content) 1fr;
}

.company {
  color: @primary-color;
  font-family: 'roboto-medium';
  margin-bottom: @size-4;
}

.title {
  color: @light-black-text-color;
  margin-bottom: @size-4;
}

.submit {
  .pad-tb-3;
  .pad-lr-7;
  border-radius: 20px;
  justify-self: center;
  align-self: end;
  margin-bottom: @size-5;
}
</style>
