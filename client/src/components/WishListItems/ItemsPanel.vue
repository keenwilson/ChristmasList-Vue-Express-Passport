<template>
  <panel title="Items Avaiable to Add to Wish List">
    <div
      class="product"
      v-for="(wishlist, index) in wishlists" :key='index'>
      <v-card>
      <v-layout>
      <v-flex xs4>
          <v-img
            :src="wishlist.largeImage"
            aspect-ratio="1"
          ></v-img>
      </v-flex>
      <v-flex xs8>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0"> {{ wishlist.name }}</h3>
              <h3 class="headline mb-0"> ${{ wishlist.salePrice }}</h3>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat color="primary"
              @click="sendToDB(index)">
              Bookmark
            </v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-flex>
      </v-layout>
      </v-card>
    </div>
  </panel>
</template>

<script>
import WalmartApiService from '@/services/WalmartApiService'
import WishListsService from '@/services/WishListsService'

export default {
  data () {
    return {
      wishlists: null,
      query: '',
      data: []
    }
  },
  watch: {
    '$route.query.search': {
      immediate: true,
      async handler (value) {
        this.wishlists = (await WalmartApiService.query(value)).data
        console.log('search this wishlists', this.wishlists)
      }
    }
  },
  methods: {
    sendToDB (index) {
      var item = {
        itemName: this.wishlists[index].name,
        imageUrl: this.wishlists[index].largeImage,
        productUrl: this.wishlists[index].productUrl,
        price: this.wishlists[index].salePrice,
        itemId: this.wishlists[index].itemId,
        userId: this.$store.state.user.id
      }
      console.log(item)
      WishListsService.post(item)
      console.log('search this wishlists', this.wishlists)
    }
  }
}
</script>

<style>

.product {
  padding: 20px;
  height: 330px;
  overflow: hidden;
}
.product-itemname {
  font-size: 24px;
}
.product-price {
 font-size: 24px;
}
.product-url {
  font-size: 12px;
}
.product-image {
  height: 180px;
  margin: 0 auto;
}

</style>
