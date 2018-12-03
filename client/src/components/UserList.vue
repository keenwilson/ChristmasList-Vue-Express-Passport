<template>
  <div>
    <div class="parallax">
      <v-layout class="py-4 px-5" style=" background-color: #303030">
        <v-flex xs12 class="ml-2">
        <p class="white--text display-2">User {{ user.userName }}</p>
        </v-flex>
      </v-layout>
    </div>
      <div class="product" v-for="(item, index) in usersList" :key="index">
      <v-card flat>
        <v-layout>
          <v-flex xs4>
            <v-img :src="item.imageUrl" aspect-ratio="1"></v-img>
          </v-flex>
          <v-flex xs8>
            <v-card-title primary-title>
              <div>
                <h3 class="mb-0 product-name font-Montserrat-semi-bold">{{ item.name }}</h3>
                <h3 class="mb-0 product-price font-Montserrat-regular">${{ item.price }}</h3>
                <p class="product-description">{{ item.shortDescription }}</p>
                <v-btn
                  flat
                  color="primary"
                  v-bind:href="item.productUrl"
                  target="_blank"
                >Visit Product Page</v-btn>
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
      usersList: null,
      user: null
    }
  },
  async mounted () {
    this.user = (await UsersService.getUser(this.$route.params.user)).data
    this.usersList = (await UsersService.usersSavedItems(this.$route.params.user)).data
    console.log('List of users.', this.usersList)
    // console.log(this.$route.params)
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
