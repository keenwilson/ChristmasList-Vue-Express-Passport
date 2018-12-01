<template>
  <div class="parallax">
    <v-layout class="pa-4" style=" background-color: #303030">
      <v-spacer
        v-if="!$store.state.isUserLoggedIn"></v-spacer>
      <v-flex :class="{
          xs8: !isUserLoggedIn,
          xs8: isUserLoggedIn
        }" class="ml-2">
        <items-search-panel />
        <items-panel class="mt-2" />
      </v-flex>
      <v-flex xs4 class="ml-2" v-if="isUserLoggedIn">
        <saved-items-panel class="mb-2" />
         <v-img
            :src="image"
            aspect-ratio="1"
            class="mb-2"
        ></v-img>
        <items-saved />
      </v-flex>
      <v-spacer
        v-if="!$store.state.isUserLoggedIn"></v-spacer>
    </v-layout>
  </div>
</template>

<script>
import ItemsPanel from './ItemsPanel'
import ItemsSaved from './ItemsSaved'
import ItemsSearchPanel from './ItemsSearchPanel'
import WishListsService from '@/services/WishListsService'
import SavedItemsPanel from './SavedItemsPanel'
import {mapState} from 'vuex'

export default {
  components: {
    ItemsPanel,
    ItemsSaved,
    ItemsSearchPanel,
    SavedItemsPanel
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },
  data () {
    return {
      wishlists: null,
      image: '/static/tree-skirt.jpg'
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
