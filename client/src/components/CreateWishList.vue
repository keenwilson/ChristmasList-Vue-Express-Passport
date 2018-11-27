<template>
  <v-layout>
    <v-flex xs4>
      <panel title="Wish List Metadata">
          <v-text-field
          label="Title"
          required
          :rules="[required]"
          v-model="wishlist.title"
        ></v-text-field>

          <v-text-field
          label="Brand"
          required
          :rules=[required]
          v-model="wishlist.brand"
        ></v-text-field>

          <v-text-field
          label="Price"
          required
          :rules=[required]
          v-model="wishlist.price"
        ></v-text-field>

      </panel>
    </v-flex>
    <v-flex xs8>
      <panel>
        <v-text-field
          label="Note to Friends"
          mlti-line
          required
          :rules=[required]
          v-model="wishlist.note"
        ></v-text-field>
      </panel>
      <span class="error"
        v-if="error">
        {{ error }}
      </span>
      <v-btn class="cyan" @click="create" dark>Create Wish List</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import WishListsService from '@/services/WishListsService'

export default {
  data () {
    return {
      wishlist: {
        title: null,
        brand: null,
        price: null,
        note: null
      },
      error: null,
      required: (value) => !!value || 'Required.'
    }
  },
  methods: {
    async create () {
      // Set error back to a default stage
      this.error = null
      // Loop all over the keys of my wish list
      // and verify every single values of that key is defined
      /* const areAllFieldsFilledIn = Object
        .keys(this.wishlist)
        .every(key => !!wishlist[key])
      if (!areAllFieldsFilledIn) {
        this.error = 'Please fill in all the require fields.'
        return
      } */

      try {
        await WishListsService.post(this.wishlist)
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
</style>
