<template>
  <div>
    <v-parallax src="static/white-bg-berries.jpg" height="700">
      <v-layout class="pt-5">
        <v-flex xs6 offset-xs3>
          <panel title="Register">
            <form
              name="christmas-list-form"
              autocomplete="off">
            <v-text-field
              label="Username"
              v-model="userName"
            ></v-text-field>
            <v-text-field
              label="Email"
              v-model="email"
            ></v-text-field>
            <v-text-field
              label="Password"
              type="password"
              v-model="password"
              auto-complete="new-password"
            ></v-text-field>
            </form>
            <br>
            <div class="danger-alert" v-html="error" />
            <v-btn class="primary" @click="register" dark>Register</v-btn>
          </panel>
        </v-flex>
      </v-layout>
    </v-parallax>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
  data () {
    return {
      userName: '',
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async register () {
      try {
        const response = await AuthenticationService.register({
          userName: this.userName,
          email: this.email,
          password: this.password
        })
        // setToken and setUser based on whatever return from the register endpoint
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$router.push({
          name: 'wishlists'
        })
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<style scoped>
.danger-alert {
  color: #b71c1c;
}
</style>
