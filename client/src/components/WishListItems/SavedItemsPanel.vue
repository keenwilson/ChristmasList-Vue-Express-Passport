<template>
  <panel title="Your Saved Items">
    <section class="main" v-show="savedItems.length">
           <v-list two-line
             v-for="(savedItem, index) in savedItems"
             :key="index">
             <v-list-tile>
              <v-list-tile-avatar>
                <img :src="savedItem.imageUrl">
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title v-html="savedItem.itemName"></v-list-tile-title>
                <v-list-tile-sub-title>${{savedItem.price}}</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn icon>
                  <v-icon
                    @click="unsetAsSavedItems(index)">
                    mdi-close-circle-outline
                  </v-icon>
                </v-btn>
            </v-list-tile-action>
            </v-list-tile>
        </v-list>
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
      const self = this
      const itemToRemove = this.savedItems[index]
      console.log('unset as savedItem this itemToRemove:', itemToRemove)
      try {
        await SavedItemsService.delete(itemToRemove.id).then(function (res) {
          console.log('DELETE savedItem res.data:', res.data)
        })
        self.$store.dispatch('removeSavedItem', itemToRemove)
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
