<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <panel title="WishLists">
        <v-btn
        slot="action"
        @click="navigateTo({name: 'wishlists-create'})"
        class="cyan accent-2"
        light
        medium
        absolute
        right
        middle
        fab>
        <v-icon>add</v-icon>
        </v-btn>
        <div
          v-for="wishlist in wishlists" :key="wishlist.id">
          {{ wishlist.title }}
          {{ wishlist.brand }}
          {{ wishlist.price}}
        </div>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import WishListsService from '@/services/WishListsService'
import Panel from '@/components/Panel'
export default {
  components: {
    Panel
  },
  data () {
    return {
      songs: null
    }
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    }
  },
  async mounted () {
    // Do a request to the backend for all the songs
    this.songs = (await WishListsService.index()).data
    console.log('wishlists', this.songs)
  }
}
</script>

<style scoped>
</style>
