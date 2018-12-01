<template>
  <panel title="Items Avaiable to Add to Wish List">
    <div class="product" v-for="(wishlist, index) in wishlists" :key="index">
      <v-card flat>
        <v-layout>
          <v-flex xs4>
            <v-img :src="wishlist.largeImage" aspect-ratio="1"></v-img>
          </v-flex>
          <v-flex xs8>
            <v-card-title primary-title>
              <div>
                <h3 class="mb-0 product-name font-Montserrat-semi-bold">{{ wishlist.name }}</h3>
                <h3 class="mb-0 product-price font-Montserrat-regular">${{ wishlist.salePrice }}</h3>
                <p class="product-description">{{ wishlist.shortDescription }}</p>
                <v-btn
                  flat
                  color="primary"
                  v-bind:href="wishlist.productUrl"
                  target="_blank"
                >Visit Product Page</v-btn>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                flat
                dark
                class="primary"
                v-if="$store.state.isUserLoggedIn"
                @click="sendToDB(index)">Add to List</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-card>
      <v-divider v-if="index + 1 < wishlists.length" :key="`divider-${index}`"></v-divider>
    </div>
  </panel>
</template>

<script>
import WalmartApiService from '@/services/WalmartApiService'
import WishListsService from '@/services/WishListsService'
import SavedItemsService from '@/services/SavedItemsService'

export default {
  data () {
    return {
      wishlists: null,
      savedItem: null,
      item: null,
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
      const self = this
      if (!this.$store.state.isUserLoggedIn) {
        return
      }
      const user = this.$store.state.user
      const item = {
        itemName: this.wishlists[index].name,
        imageUrl: this.wishlists[index].largeImage,
        productUrl: this.wishlists[index].productUrl,
        price: this.wishlists[index].salePrice,
        itemId: this.wishlists[index].itemId,
        shortDescription: this.wishlists[index].shortDescription,
        isSaved: true,
        userId: user.id
      }
      WishListsService.post(item).then((res) => {
        // Set savedItem after the user save the item to database
        console.log('response from WishList POST res.data', res.data)
        const newWishlistID = res.data.id
        SavedItemsService.post({
          wishlistId: newWishlistID
        }).then((res) => {
          console.log('POST to savedItem res.data:', res.data)
          // Add the item to store
          setTimeout(function () {
            try {
              const itemToSaveToStore = res.data
              console.log('Try to add new savedItem for wishlist.id', itemToSaveToStore.WishListId)
              console.log('Check item data', item)
              // Merging objects with same properties
              const newSavedItem = Object.assign({}, itemToSaveToStore, item)
              console.log('merge newSavedItem for pushing to store', newSavedItem)
              self.$store.dispatch('addSavedItem', newSavedItem)
            } catch (err) {
              console.log(err)
            }
          }, 500)
        })
      })
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

.product-name {
  font-size: 22px;
  max-height: 64px;
  overflow: scroll;
}
.product-price {
  font-size: 22px;
  color: #004d40;
}
.product-url {
  font-size: 12px;
}
.product-image {
  height: 180px;
  margin: 0 auto;
}

.product-description {
  overflow: scroll;
  height: 40px;
}
</style>
