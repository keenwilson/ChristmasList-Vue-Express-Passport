<template>
  <v-layout class="pa-4">
    <v-flex :class="{
        xs12: !isUserLoggedIn,
        xs8: isUserLoggedIn
      }" class="ml-2">
      <items-search-panel />
      <items-panel class="mt-2" />
    </v-flex>
    <v-flex xs4 class="ml-2" v-if="isUserLoggedIn">
      <items-bookmarks />
    </v-flex>
  </v-layout>
</template>

<script>
import ItemsPanel from './ItemsPanel'
import ItemsBookmarks from './ItemsBookmarks'
import ItemsSearchPanel from './ItemsSearchPanel'
import WishListsService from '@/services/WishListsService'
import {mapState} from 'vuex'

export default {
  components: {
    ItemsPanel,
    ItemsBookmarks,
    ItemsSearchPanel
  },
  computed: {
    ...mapState([
      'isUserLoggedIn'
    ])
  },
  data () {
    return {
      wishlists: null
    }
  },
  async mounted () {
    // Do a request to the backend for all the items
    this.wishlists = (await WishListsService.index()).data
    console.log('wishlists', this.wishlists)
  }
}
</script>

<style>

</style>
