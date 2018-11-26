<template>
  <panel title="Recently Viewd Items">
    <v-data-table
      :headers="headers"
      :pagination.sync="pagination"
      :items="histories">
      <template slot="items" slot-scope="props">
        <td class="text-xs-right">
          {{props.item.itemName}}
        </td>
        <td class="text-xs-right">
          {{props.item.price}}
        </td>
      </template>
    </v-data-table>
  </panel>
</template>

<script>
import {mapState} from 'vuex'
import ItemsHistoryService from '@/services/ItemsHistoryService'

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
        }
      ],
      pagination: {
        sortBy: 'createdAt',
        descending: true
      },
      histories: []
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },
  async mounted () {
    if (this.isUserLoggedIn) {
      this.histories = (await ItemsHistoryService.index()).data
      console.log('histories', this.histories)
    }
  }
}
</script>

<style>

</style>
