<template>
    <v-layout justify-space-around wrap class="py-4 px-5" style=" background-color: #303030">
      <v-spacer
        v-if="!$store.state.isUserLoggedIn"></v-spacer>
      <v-flex
        xs12 md8
        order-md1 order-xs2>
        <items-search-panel class="mx-2 my-2"/>
        <items-panel class="mx-2 my-2" />
      </v-flex>
      <v-flex
        xs12 md4
        order-md2 order-xs1
        v-if="isUserLoggedIn">
        <saved-items-panel class="mx-2 my-2" />
         <v-img
            :src="image"
            aspect-ratio="1"
            class="mx-2 my-2"
        ></v-img>
      </v-flex>
      <v-spacer
        v-if="!$store.state.isUserLoggedIn"></v-spacer>
    </v-layout>
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
