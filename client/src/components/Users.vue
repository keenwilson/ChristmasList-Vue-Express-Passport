<template>
  <div>
    <div class="parallax">
      <v-layout class="py-4 px-5" style=" background-color: #303030">
        <v-flex xs12 class="ml-2">
        <p class="white--text display-2">Users</p>
        </v-flex>
      </v-layout>
    </div>
    <div class="users" v-for="(user, index) in usersList" :key="user.id">
      <v-card flat>
        <v-layout>
          <v-flex xs8>
            <v-card-title primary-title>
              <div>
                <router-link :to="'/user/' + user.id"><p class="title">{{ user.userName }}</p></router-link>
              </div>
            </v-card-title>
          </v-flex>
        </v-layout>
      </v-card>
      <v-divider v-if="index + 1 < usersList.length" :key="`divider-${index}`"></v-divider>
    </div>
  </div>
</template>

<script>
import UsersService from '@/services/UsersService.js'

export default {
  data () {
    return {
      usersList: null
    }
  },
  async mounted () {
    this.usersList = (await UsersService.index()).data
    console.log('List of users.', this.usersList)
  },
  computed: {
    users () {
      return UsersService.index().data
    }
  }
}
</script>

<style>
</style>
