<template>
    <v-layout class="py-4 px-5 container-shader" style=" background-color: #303030">
      <v-flex xs12 md8 offset-md2>
        <panel title="Users">
          <div class="users" v-for="(user, index) in usersList" :key="user.id">
              <v-card flat>
                <v-card-title primary-title>
                  <router-link :to="'/user/' + user.id"><p class="title font-Montserrat-semi-bold username">{{ user.userName }}</p></router-link>
                </v-card-title>
              </v-card>
              <v-divider v-if="index + 1 < usersList.length" :key="`divider-${index}`"></v-divider>
          </div>
        </panel>
      </v-flex>
    </v-layout>
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
  }
}
</script>

<style>
.username {
  text-decoration: none;
}

.container-shader {
  height: 100vh;
}

@media only screen and (max-width: 480px){
 .container-shader{
  height: auto;
 }
}
</style>
