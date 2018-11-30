<template>
  <panel title="Product Info">
    <v-card flat>
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
              <v-btn flat color="primary"
              v-bind:href="wishlist.productUrl"
              target="_blank">
              Visit Product Page
            </v-btn>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              v-if="isUserLoggedIn && !savedItem"
              dark
              class="primary"
              @click="setAsSavedItem">
              Add to List
            </v-btn>
            <v-btn
              v-if="isUserLoggedIn && savedItem"
              dark
              class="primary"
              @click="unsetAsSavedItem">
              Remove from List
            </v-btn>
             <v-spacer></v-spacer>
        </v-card-actions>
      </v-flex>
    </v-layout>
    </v-card>
  </panel>
</template>

<script>
import {mapState} from 'vuex'
import SavedItemsService from '@/services/SavedItemsService'

export default {
  props: [
    'wishlist'
  ],
  data () {
    return {
      // Set savedItem key to keep track of savedItem return from the back end
      savedItem: null
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },
  watch: {
    async wishlist () {
      if (!this.isUserLoggedIn) {
        return
      }

      try {
        console.log('check savedItem for wishlist.id', this.wishlist.id)
        const savedItems = (await SavedItemsService.index({
          wishlistId: this.wishlist.id
        })).data
        if (savedItems.length) {
          this.savedItem = savedItems[0]
          console.log('this.savedItem', this.savedItem)
        }
      } catch (err) {
        console.log(err)
      }
    }
  },
  methods: {
    async setAsSavedItem () {
      console.log(`create savedItem userId:${this.$store.state.user.id} and itemId: ${this.wishlist.id}`)
      try {
        // Set this.savedItems to whatever the back end returns
        this.savedItems = (await SavedItemsService.post({
          wishlistId: this.wishlist.id
        })).data
        this.$router.push({
          name: 'wishlists'
        })
      } catch (err) {
        console.log(err)
      }
    },
    async unsetAsSavedItem () {
      try {
        await SavedItemsService.delete(this.savedItem.id)
        this.savedItem = null
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

<style scoped>

.product {
  padding: 20px;
  height: 330px;
  overflow: hidden;
}
.product-itemname {
  font-size: 30px;
}
.product-price {
 font-size: 24px;
}
.product-url {
  font-size: 18px;
}
.product-image {
  width: 70%;
  margin: 0 auto;
}
textarea {
  width: 100%;
  font-family: monospace;
  border: none;
  height: 600px;
  border-style: none;
  border-color: transparent;
  overflow: auto;
  padding: 40px;
}
</style>
