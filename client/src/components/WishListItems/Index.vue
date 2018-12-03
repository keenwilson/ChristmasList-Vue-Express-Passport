<template>
  <div class="parallax">
    <v-layout class="py-4 px-5" style=" background-color: #303030">
       <v-spacer
        v-if="!$store.state.isUserLoggedIn"></v-spacer>
      </v-layout>
   <v-container fluid>
      <v-layout row wrap>  

          <v-flex xs12 sm12 md6 lg6 order-xs2 order-md1 >
            <items-search-panel class = " ml-4 mt-4" />
            <items-panel class = "mt-4 ml-4 mb-3" />
            </v-flex>
            

            <v-flex xs12 sm12 md6 lg6 order-xs1 order-md2 >
           <saved-items-panel class = "ml-4 mt-4 mb-4" />
        
           <v-img xs12 sm12 md4 lg4 order-xs2 order-md3
            :src="image"
            aspect-ratio="2.5"
            class="mb-2 ml-4"
        ></v-img>
      </v-flex>
            

         </v-layout>
  </v-container>
  </div>
</template>
       

<script>
import ItemsPanel from "./ItemsPanel";
import ItemsSaved from "./ItemsSaved";
import ItemsSearchPanel from "./ItemsSearchPanel";
import WishListsService from "@/services/WishListsService";
import SavedItemsPanel from "./SavedItemsPanel";
import { mapState } from "vuex";

export default {
  components: {
    ItemsPanel,
    ItemsSaved,
    ItemsSearchPanel,
    SavedItemsPanel
  },
  computed: {
    ...mapState(["isUserLoggedIn", "user"])
  },
  data() {
    return {
      wishlists: null,
      image: "/static/tree-skirt.jpg"
    };
  },
  async mounted() {
    // Do a request to the backend for all the items
    this.wishlists = (await WishListsService.index()).data;
    console.log("wishlists", this.wishlists);
  }
};
</script>

<style>
</style>
