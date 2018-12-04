<template>
  <v-layout class="py-4 px-5" style=" background-color: #303030">
    <v-flex xs12 md8 offset-md2>
      <panel title="Items in Christmas List">
        <p class="mt-2">Here is a list of what <strong>{{ user.userName }}</strong> wants for this Christmas.
        <br>Merry Christmas and Happy Holidays to all.</p>
        <hr>
        <div class="product" v-for="(item, index) in userList" :key="index">
          <v-card flat>
            <v-layout>
              <v-flex xs4>
                <v-img :src="item.imageUrl" aspect-ratio="1"></v-img>
              </v-flex>
              <v-flex xs8>
                <v-card-title primary-title>
                  <div>
                    <h3 class="mb-0 product-name font-Montserrat-semi-bold">{{ wishlist.name | truncate(70, '...')  }}</h3>
                    <h3 class="mb-0 product-price font-Montserrat-regular">${{ wishlist.salePrice }}</h3>
                    <p class="product-description">{{ wishlist.shortDescription | truncate(110, '...') }}</p>
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
          <v-divider v-if="index + 1 < userList.length" :key="`divider-${index}`"></v-divider>
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
      userList: []
    }
  },
  async mounted () {
    this.userList = (await UsersService.usersSavedItems(this.$route.params.user)).data
    console.log('The item list of this user', this.userList)
    // console.log(this.$route.params)
  },
  computed: {
    user () {
      console.log('this.$store.state.user', this.$store.state.user)
      return this.$store.state.user
    }
  }
}
</script>

<style>
.product {
  padding: 20px;
  min-height: 330px;
}

.product-name {
  font-size: 20px;
}
.product-price {
  font-size: 18px;
  color: #004d40;
}
.product-url {
  font-size: 12px;
}
.product-image {
  max-height: 180px;
  margin: 0 auto;
}

.product-description {
  font-size: 14px;
}

</style>
