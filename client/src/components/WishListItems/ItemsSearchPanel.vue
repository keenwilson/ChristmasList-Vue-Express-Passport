<template>
  <panel title="Search">
    <v-text-field label="Search product names" v-model="search">{{search}}</v-text-field>
  </panel>
</template>

<script>
const search = new Vue({
  el: "#search",
  data: {
    results: []
  },
  mounted() {
    fetch("/walmart?search=query")
      .then(response => response.json())
      .then(data => {
        this.search = data;
      });
  },
});
// import _ from 'lodash'

// export default {
//   data () {
//     return {
//       search: ''
//     }
//   },
//   watch: {
//     search: _.debounce(async function (value) {
//       const route = {
//         name: 'wishlists'
//       }
//       if (this.search !== '') {
//         route.query = {
//           search: this.search
//         }
//       }
//       this.$router.push(route)
//     }, 500),
//     '$route.query.search': {
//       immediate: true,
//       handler (value) {
//         this.search = value
//       }
//     }
//   }

// }
</script>

<style>
</style>
