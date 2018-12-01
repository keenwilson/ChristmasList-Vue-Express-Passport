<template>
  <panel title="Christmas List">
    <v-data-table
      :headers="headers"
      :pagination.sync="pagination"
      :items="savedItems">
      <template slot="items" slot-scope="props">
        <td class="text-xs-right">
          <router-link
            class="savedItems-title"
            :to='"/wishlists/" + props.item.WishListId'>{{props.item.itemName}}</router-link>
        </td>
        <td class="text-xs-right">
          ${{props.item.price}}
        </td>
       <td class="text-xs-right">
          <span v-if="props.item.isSaved">
            <v-icon
              class="unSaved"
              @click.native="unsetAsSavedItems(props.item)">
                mdi-close-circle-outline
            </v-icon>
        </span>
        </td>
      </template>
    </v-data-table>
  </panel>
</template>

<script>
import {mapState} from 'vuex'
import SavedItemsService from '@/services/SavedItemsService'

export default {
  data () {
    return {
      headers: [
        {
          text: 'Item Name',
          value: 'itemName'
        },
        {
          text: 'Price',
          value: 'price'
        },
        {
          text: '',
          value: ''
        }
      ],
      pagination: {
        sortBy: 'createdAt',
        descending: true
      },
      savedItems: [],
      itemToRemove: null
    }
  },
  props: [
    'wishlist'
  ],
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },
  async mounted () {
    if (this.isUserLoggedIn) {
      this.savedItems = (await SavedItemsService.index()).data
      console.log('savedItems', this.savedItems)
    }
  },
  methods: {
    async unsetAsSavedItems (item) {
      this.itemToRemove = item
      console.log('unset as savedItem this itemToRemove:', this.itemToRemove)
      try {
        await SavedItemsService.delete(this.itemToRemove.id).then(function (res) {
          console.log('DELETE savedItem res.data:', res.data)
        })
        this.itemToRemove = null
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
.savedItems-title {
  text-decoration: none;
}

.savedItems-title:hover {
  color: #00897b;
}

.unSaved {
  cursor: pointer;
}
</style>
