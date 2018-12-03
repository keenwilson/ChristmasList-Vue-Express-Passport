<template>
  <div id="app">
    <v-app>
      <page-header />
      <main>
        <v-content fluid>
          <router-view/>
        </v-content>
      </main>
      <page-footer />
    </v-app>
  </div>
</template>

<script>
import PageHeader from '@/components/Header.vue'
import PageFooter from '@/components/Footer.vue'

export default {
  name: 'app',
  components: {
    PageHeader,
    PageFooter
  }
}
</script>

<style>
@import url(https://fonts.googleapis.com/css?family=Montserrat);

#app {
  font-family: 'Montserrat', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #434434;
  margin-top: 60px;
  height: 100%
}

.font-Montserrat-regular {
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
}

.font-Montserrat-semi-bold {
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
}

.font-Montserrat-bold {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
}
</style>
