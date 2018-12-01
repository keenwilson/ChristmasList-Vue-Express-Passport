<template>
  <panel title="Items Avaiable to Add to Christmas List">
    <v-layout
      v-show="!wishlists"
      column
      align-center
      justify-center
      class="white--text">
        <v-card flat light>
          <v-img
            src="static/train.jpg"
            aspect-ratio="2.75"
          ></v-img>
          <v-card-title primary-title>
            <div>
              <p class="shadow text1">CHRISTMAS</p>
              <p class="shadow text3">LIST</p>
              <p class="script"><span>Start</span></p>
              <div>Search products you wish to receive for Christmas from an extensive product catalog</div>
              <p class="script"><span>Then</span></p>
              <div>Add or remove items to your list with our easy-to-use interface.</div>
            </div>
          </v-card-title>
        </v-card>
    </v-layout>
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

<style scoped>
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

.plate {
  width: 410px;
  margin: 10% auto;
}
.shadow {
  color: #fff;
  font-family: Arvo;
  font-weight: bold;
  text-shadow:
    -3px -3px 0 #222,
    3px -3px 0 #222,
    -3px 3px 0 #222,
    3px 3px 0 #222,
    4px 4px 0 #fff,
    5px 5px 0 #fff,
    6px 6px 0 #fff,
    7px 7px 0 #fff;
  line-height: 0.8em;
  letter-spacing: 0.1em;
  transform: scaleY(0.7);
  -webkit-transform: scaleY(0.7);
  -moz-transform: scaleY(0.7);
  margin:0;
  text-align: center;
}
.script {
  font-family: "Seaweed Script";
  color: #fff;
  text-align: center;
  font-size: 30px;
  position: relative;
  margin:0;
}
.script span {
  background-color: #222;
  padding: 0 0.3em;
}
.script:before {
  content:"";
  display: block;
  position: absolute;
  z-index:-1;
  top: 50%;
  width: 100%;
  border-bottom: 3px solid #222;
}
.text1 {
  font-size: 60px;
}
.text2 {
  font-size: 126px;
}
.text3 {
  font-size: 100px;
}
</style>
