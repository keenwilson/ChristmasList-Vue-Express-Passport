<template>
  <panel title="Items Avaiable to Add to Wish List">
    <div
      class="product"
      v-for="wishlist in wishlists" :key="wishlist.id">
      <v-layout>
        <v-flex xs6>
          <img class="product-image" :src="wishlist.imageUrl" />
        </v-flex>
        <v-flex xs6>
          <div class="product-itemname">
            {{ wishlist.itemName }}
          </div>
          <div class="product-price">
            ${{ wishlist.price }}
          </div>
          <div class="product-url">
            {{ wishlist.productUrl}}
          </div>
          <v-btn
            dark
            class="primary"
            :to="{
              name: 'wishlist',
              params: {
                wishlistId: wishlist.id
              }
            }">
            View
          </v-btn>
        </v-flex>
      </v-layout>
    </div>
  </panel>
</template>

<script>
import WishListsService from '@/services/WishListsService'

export default {
  data () {
    return {
      wishlists: null
    }
  },
  watch: {
    '$route.query.search': {
      immediate: true,
      async handler (value) {
        this.wishlists = (await WishListsService.index(value)).data
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
