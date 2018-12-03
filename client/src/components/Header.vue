<template>
  <v-toolbar fixed class="primary" dark>
    <v-toolbar-title class="mr-4">
      <router-link
        class="home font-Montserrat-bold"
        tag="span"
        :to="{
          name: 'root'
        }">
        Christmas List
      </router-link>
    </v-toolbar-title>

    <v-toolbar-items>
      <v-btn
        flat
        class="font-Montserrat-semi-bold"
        v-if="$store.state.isUserLoggedIn"
        :to="{
          name: 'wishlists'
        }">
        Explore
      </v-btn>
    </v-toolbar-items>

    <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn
          flat
          class="font-Montserrat-semi-bold"
          v-if="$store.state.isUserLoggedIn"
          :to="{
            name: 'users'
          }">
          Find Friends
        </v-btn>
      <v-btn
        v-if="!$store.state.isUserLoggedIn"
        flat
        dark
        class="font-Montserrat-semi-bold"
        :to="{
          name: 'login'
        }">
        Login
      </v-btn>

      <v-btn
        v-if="!$store.state.isUserLoggedIn"
        flat
        dark
        class="font-Montserrat-semi-bold"
        :to="{
          name: 'register'
        }">
        Sign Up
      </v-btn>
      <v-btn
        v-if="$store.state.isUserLoggedIn"
        flat
        dark
        class="font-Montserrat-semi-bold"
        @click="logout">
        Log Out
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  methods: {
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$store.dispatch('setSavedItems', [])
      this.$store.commit('reset')
      this.$router.push({
        name: 'root'
      })
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Montserrat:600,700');

.font-Montserrat-semi-bold {
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
}

.font-Montserrat-bold {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
}

.home {
  cursor: pointer;
}

.home:hover {
  color: #00897b;
}
</style>
