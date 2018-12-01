<template>
  <panel title="Your Saved Items">
    <section class="main" v-show="savedItems.length">
      <ul class="savedItems-list">
        <li
          v-for="(savedItem, index) in savedItems"
          :key="index">
          <span> Found and item {{ savedItem.UserId }} {{ savedItem.WishListId }}</span>
          <v-icon
            class="unSaved"
            @click="unsetAsSavedItems(index)">
              mdi-close-circle-outline
          </v-icon>
        </li>
      </ul>
    </section>
  </panel>
</template>

<script>
import SavedItemsService from '@/services/SavedItemsService'

export default {
  computed: {
    savedItems () {
      return this.$store.state.savedItems
    }
  },
  methods: {
    async unsetAsSavedItems (index) {
      const savedItems = this.$store.state.savedItems
      const itemToRemove = savedItems[index]
      console.log('unset as savedItem this itemToRemove:', itemToRemove)
      try {
        await SavedItemsService.delete(itemToRemove.id).then(function (res) {
          console.log('DELETE savedItem res.data:', res.data)
        })
        this.itemToRemove = null
        this.$router.push({
          name: 'wishlists'
        })
      } catch (err) {
        console.log(err)
      }
    },
    matchSavedItems () {
      console.log(this.$store.state.savedItems)
      const savedItemsFromStore = this.$store.state.savedItems
      const savedItemsToDisplay = []
      try {
        for (var i = 0; i < savedItemsFromStore.length; i++) {
          console.log('check savedItem for wishlist.id', savedItemsFromStore[i].WishListId)
          const savedItemFromSQL = (SavedItemsService.index({
            wishlistId: savedItemsFromStore.WishListId
          })).data
          if (savedItemFromSQL.length) {
            const savedItem = savedItemFromSQL[0]
            console.log('savedItem from SQL', savedItem)
            savedItemsToDisplay.push(savedItem)
          }
        }
      } catch (err) {
        console.log(err)
      }
      console.log('savedItemsToDisplay', savedItemsToDisplay)
      return savedItemsToDisplay
    }
  }
}
</script>

<style>

</style>
