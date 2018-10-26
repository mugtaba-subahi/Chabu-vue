<template>
  <form class="form" v-on:submit.prevent="submit">
    <h1 class="company">Chabu</h1>
    <h2 class="title">Login</h2>
    <InputWithError
      placeholder="Username"
      :value="formValues.username"
      :error="formErrors.username"
      :changed="bindInputMixin('username')"
      required
    />
    <InputWithError
      placeholder="Password"
      :type="'password'"
      :value="formValues.password"
      :error="formErrors.password"
      :changed="bindInputMixin('password')"
      required
    />
    <ButtonWithLoader
      class="submit"
      :buttonType="'primary'"
      :text="'Login'"
      :loading="loginLoader"
    />
  </form>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

import InputWithError from '../components/InputWithError.vue';
import ButtonWithLoader from '../components/ButtonWithLoader.vue';

import server from '../axios';
import mixins from '../mixins';

@Component({
  components: { InputWithError, ButtonWithLoader },
  mixins: [mixins]
})
export default class Login extends Vue {
  formValues = { username: '', password: '' };
  formErrors = { username: '', password: '' };
  loginLoader = false;

  resetErrors() {
    this.formErrors = { username: '', password: '' };
  }

  async submit() {
    this.loginLoader = true;
    this.resetErrors();

    const response = await server.post('login', this.formValues).catch(error => error.response);
    if (!response) {
      this.loginLoader = false;
      return;
    }

    if (response.data.errors.length) {
      const { errors } = response.data;
      mixins.methods.appendErrorsMixin(errors, this.formErrors);
      this.loginLoader = false;
      return;
    }

    this.loginLoader = false;
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
