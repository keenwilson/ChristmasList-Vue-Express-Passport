<template>
  <v-layout column>
    <v-flex xs4 >
      <panel title="Edit Profile">
        <v-text-field
          label="Name"
          v-model="name">
          </v-text-field>
           <v-text-field
          label="Username"
          v-model="username"
        ></v-text-field>
           <br>
           <div class="error" v-html="error" />
        <v-btn class="cyan" @click="editProfile" dark>Update Profile</v-btn>
      </panel>
    </v-flex>
    <v-flex xs8>
    </v-flex>
  </v-layout>
</template>

<script>
import Panel from '@/components/Panel'

export default {
  data () {
    return {
      name: '',
      username: '',
      error: null
    }
  },
  components: {
    Panel
  }
}
</script>

<style scoped>
.error {
  color: red;
}
</style>
