<template>
  <div>
    <v-layout class="pa-4">
      <v-flex xs8 offset-xs2>
        <item-metadata :wishlist="wishlist"/>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import ItemMetadata from './ItemMetadata'
import WishListsService from '@/services/WishListsService'
import ItemsHistoryService from '@/services/ItemsHistoryService'
import {mapState} from 'vuex'

export default {
  data () {
    return {
      wishlist: {}
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user',
      'route'
    ])
  },
  // index.js only concerns about fetching the wishlist item
  async mounted () {
    // Grab the state of Vuex store and get the wishlistId from the URL
    const wishlistId = this.route.params.wishlistId
    this.wishlist = (await WishListsService.show(wishlistId)).data

    if (this.isUserLoggedIn) {
      ItemsHistoryService.post({
        wishlistId: this.wishlist.id
      })
    }
  },
  components: {
    ItemMetadata
  }
}
</script>

<style scoped>
</style>
