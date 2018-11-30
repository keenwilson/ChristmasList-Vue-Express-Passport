<template>
  <div>
    <section>
      <v-parallax src="static/train.jpg" height="700">
        <v-layout
          column
          align-center
          justify-center
          class="white--text"
        >
          <div class="plate">
            <p class="script"><span>The Original</span></p>
            <p class="shadow text1">CHRISTMAS</p>
            <p class="shadow text3">LIST</p>
            <p class="script"><span>by Group 5 Studio</span></p>
          </div>
          <v-btn
            flat
            v-if="!$store.state.isUserLoggedIn"
            dark
            :to="{
            name: 'register'
            }">
            Get Started
          </v-btn>
          <v-btn
            v-if="$store.state.isUserLoggedIn"
            flat
            dark
            :to="{
            name: 'wishlists'
            }">
            Create a List
          </v-btn>
        </v-layout>
      </v-parallax>
    <v-layout
      column
      wrap
      class="my-5"
      align-center
    >
      <v-flex xs12 sm4 class="my-3">
        <div class="text-xs-center">
          <h2 class="headline font-Montserrat-semi-bold">Tell the world what you want for Christmas</h2>
          <span class="subheading">
            As the gift-giving time of the year is approaching, we would like to help people give and get the gifts that matter most.
          </span>
        </div>
      </v-flex>
      <v-flex xs12>
        <v-container grid-list-xl>
          <v-layout row wrap align-center>
            <v-flex xs12 md4>
              <v-card class="elevation-0 transparent">
                <v-card-text class="text-xs-center">
                  <v-icon x-large class="primary--text text--lighten-2">mdi-shopping</v-icon>
                </v-card-text>
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline text-xs-center font-Montserrat-semi-bold">Create a List</div>
                </v-card-title>
                <v-card-text>
                  Search products or services you wish to receive for Christmas from an extensive product catalog, then add or remove items to your list with our easy-to-use interface.
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs12 md4>
              <v-card class="elevation-0 transparent">
                <v-card-text class="text-xs-center">
                  <v-icon x-large class="primary--text text--lighten-2">mdi-message-text-outline</v-icon>
                </v-card-text>
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline font-Montserrat-semi-bold">Simple for a Friend</div>
                </v-card-title>
                <v-card-text>
                  Gift-givers can look for your list by using your name or email. Once they mark an idea reserved or purchased, everyone else can see that status, avoiding duplicate gifts.
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs12 md4>
              <v-card class="elevation-0 transparent">
                <v-card-text class="text-xs-center">
                  <v-icon x-large class="primary--text text--lighten-2">mdi-pine-tree</v-icon>
                </v-card-text>
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline text-xs-center font-Montserrat-semi-bold">About the Spirit of Christmas</div>
                </v-card-title>
                <v-card-text>
                  That's when the Spirit of Christmas smiled.
                  "Remember, this all began with a child.
                  Because it took nothing but love to begin it,
                  it's not really Christmas if love isn't in it."
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
    <v-parallax src="static/snow-pine-berries.jpg" height="700">
      <v-layout
        column
        align-center
        justify-center
        class="primary--text font-Montserrat"
      >
        <img src="static/frame-xmas.jpg" alt="Christmas" height="200">
        <h1 class="mt-2 primary--text mb-2 display-1 text-xs-center font-Montserrat-semi-bold">Happy Every Thing</h1>
        <div class="subheading mb-3 text-xs-center">Creating a Christmas List has never been easier. Start your list today</div>
        <v-btn
          color="primary"
          flat
          v-if="!$store.state.isUserLoggedIn"
          dark
          large
          :to="{
          name: 'register'
          }">
          Get Started
        </v-btn>
        <v-btn
          color="primary"
          v-if="$store.state.isUserLoggedIn"
          flat
          dark
          large
          :to="{
          name: 'wishlists'
          }">
          Create a List
        </v-btn>
      </v-layout>
    </v-parallax>
    </section>
  </div>
</template>

<script>
export default {

}
</script>

<style>
@import url(https://fonts.googleapis.com/css?family=Arvo:700);
@import url(https://fonts.googleapis.com/css?family=Seaweed+Script);

.font-Montserrat-semi-bold {
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
}

body {
  background-color: #222;
}
.plate {
  width: 410px;
  margin: 10% auto;
}
.shadow {
  color: #fff;
  font-family: Arvo;
  font-weight: bold;
  text-shadow:
    -3px -3px 0 #222,
    3px -3px 0 #222,
    -3px 3px 0 #222,
    3px 3px 0 #222,
    4px 4px 0 #fff,
    5px 5px 0 #fff,
    6px 6px 0 #fff,
    7px 7px 0 #fff;
  line-height: 0.8em;
  letter-spacing: 0.1em;
  transform: scaleY(0.7);
  -webkit-transform: scaleY(0.7);
  -moz-transform: scaleY(0.7);
  margin:0;
  text-align: center;
}
.script {
  font-family: "Seaweed Script";
  color: #fff;
  text-align: center;
  font-size: 40px;
  position: relative;
  margin:0;
}
.script span {
  background-color: #222;
  padding: 0 0.3em;
}
.script:before {
  content:"";
  display: block;
  position: absolute;
  z-index:-1;
  top: 50%;
  width: 100%;
  border-bottom: 3px solid #fff;
}
.text1 {
  font-size: 60px;
}
.text2 {
  font-size: 126px;
}
.text3 {
  font-size: 100px;
}
</style>
