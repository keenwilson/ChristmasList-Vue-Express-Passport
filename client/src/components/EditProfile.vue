<!-- <template>
  <v-layoutcolumn>
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
           <div class="danger-alert" v-html="error" />
        <v-btn class="primary" @click="editProfile" dark>Update Profile</v-btn>
      </panel>
    </v-flex>
    <v-flex xs8>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      username: '',
      error: null
    }
  }
}
</script>

<style scoped>
.danger-alert {
  color: #b71c1c;
}
</style>
