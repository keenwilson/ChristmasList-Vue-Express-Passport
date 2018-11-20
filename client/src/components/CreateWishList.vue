<template>
  <v-layout>
    <v-flex xs4>
      <panel title="Song Metadata">
          <v-text-field
          label="Title"
          required
          :rules="[required]"
          v-model="song.title"
        ></v-text-field>

          <v-text-field
          label="Artist"
          required
          :rules=[required]
          v-model="song.artist"
        ></v-text-field>

          <v-text-field
          label="Genre"
          required
          :rules=[required]
          v-model="song.genre"
        ></v-text-field>

          <v-text-field
          label="Album"
          required
          :rules=[required]
          v-model="song.album"
        ></v-text-field>

          <v-text-field
          label="Album Image URL"
          required
          :rules=[required]
          v-model="song.albumImageUrl"
        ></v-text-field>

          <v-text-field
          label="Youtube ID"
          required
          :rules=[required]
          v-model="song.youtubeId"
        ></v-text-field>
      </panel>
    </v-flex>
    <v-flex xs8>
      <panel title="Song Structure" class="ml-2">
        <v-text-field
          label="Tab"
          mlti-line
          required
          :rules=[required]
          v-model="song.tab"
        ></v-text-field>

        <v-text-field
          label="Lyrics"
          mlti-line
          required
          :rules=[required]
          v-model="song.lyrics"
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
import Panel from '@/components/Panel'
import SongsService from '@/services/SongsService'

export default {
  data () {
    return {
      wishlist: {
        title: null,
        brand: null,
        price: null,
      },
      error: null,
      required: (value) => !!value || 'Required.'
    }
  },
  components: {
    Panel
  },
  methods: {
    async create () {
      // Set error back to a default stage
      this.error = null
      // Loop all over the keys of my wish list
      // and verify every single values of that key is defined
      const areAllFieldsFilledIn = Object
        .keys(this.wishlist)
        .every(key => !!wishlist[key])
      if (!areAllFieldsFilledIn) {
        this.error = 'Please fill in all the require fields.'
        return
      }

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
