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
                v-if="isUserLoggedIn"
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
import BookmarksService from '@/services/BookmarksService'
import {mapState} from 'vuex'

export default {
  data () {
    return {
      wishlists: null,
      bookmark: null,
      item: null,
      query: '',
      data: []
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
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
      if (!this.isUserLoggedIn) {
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
        isBookmarked: true,
        userId: user.id
      }
      WishListsService.post(item).then(function (res) {
        // Set bookmark after the user save the item to database
        console.log('response from WishList POST res.data', res.data)
        const newWishlistID = res.data.id
        BookmarksService.post({
          wishlistId: newWishlistID
        }).then(function (res) {
          console.log('POST to Bookmark res.data:', res.data)
        })
        
      })
    },
    async unsetAsBookmark (wishlist) {
      try {
        await BookmarksService.delete(this.bookmark.id)
        this.bookmark = null
        this.$router.push({
          name: 'wishlists'
        })
      } catch (err) {
        console.log(err)
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
