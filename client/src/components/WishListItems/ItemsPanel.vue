<template>
  <panel title="Items Avaiable to Add to Wish List">
    <div
      class="product"
      v-for="wishlist in wishlists" :key="wishlist.Id">
      <v-card>
      <v-layout>
      <v-flex xs4>
          <v-img
            :src="wishlist.imageUrl"
            aspect-ratio="1"
          ></v-img>
      </v-flex>
      <v-flex xs8>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0"> {{ wishlist.itemName }}</h3>
              <h3 class="headline mb-0"> ${{ wishlist.price }}</h3>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat color="primary"
              :to="{
              name: 'wishlist',
              params: {
                wishlistId: wishlist.id
              }
            }">
              View
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
        this.wishlists = (await WishListsService.query(value)).data
        console.log('search this wishlists', this.wishlists)
      }
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
