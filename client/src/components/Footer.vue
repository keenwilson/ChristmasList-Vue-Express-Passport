<template>
  <v-footer class="primary darken-1 justify-center pl-0" inset app>
    <v-layout row wrap align-center>
      <v-flex xs12>
        <div class="white--text ml-3 font-Montserrat-semi-bold">
          Made with
          <v-icon class="error--text">favorite</v-icon>
          by <a class="white--text footer-link" href="https://github.com/keenwilson/group5-studio-project-2" target="_blank">Group 5 Studio</a>
        </div>
      </v-flex>
    </v-layout>
  </v-footer>
</template>

<script>
export default {

}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Montserrat:600,700');

.font-Montserrat-semi-bold {
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
}

.footer-link {
  text-decoration: none;
  cursor: pointer;
}
</style>
