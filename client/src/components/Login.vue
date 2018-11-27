<template>
  <div>
    <v-parallax src="static/wreath.jpg" height="700">
      <v-layout class="pt-5">
        <v-flex xs6 offset-xs3>
          <panel title="Login">
            <v-text-field
              label="Username or Email"
              v-model="userCreds"
            ></v-text-field>
            <v-text-field
              label="Password"
              type="password"
              v-model="password"
            ></v-text-field>
            <br>
            <div class="danger-alert" v-html="error" />
            <v-btn class="primary" @click="login" dark>Login</v-btn>
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
      userCreds: '',
      password: '',
      error: null
    }
  },
  methods: {
    async login () {
      try {
        // Keep track of responses return from a server
        // Set token and user based on those responses
        const response = await AuthenticationService.login({
          userCreds: this.userCreds,
          password: this.password
        })
        // setToken and setUser based on whatever return from the login endpoint
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
