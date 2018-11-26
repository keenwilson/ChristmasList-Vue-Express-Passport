<template>
  <section>
    <v-parallax src="https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2560x1707/904da35679bae32f0064be7f44d60e75/photo-1505139229755-18651479b8be" height="600">
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
        <h2 class="headline">Tell the world what you want for Christmas</h2>
        <span class="subheading">
          Tell the world what you want for Christmas 
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
                <div class="headline text-xs-center">Create a List</div>
              </v-card-title>
              <v-card-text>
                Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare. 
                Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
                Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti. 
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs12 md4>
            <v-card class="elevation-0 transparent">
              <v-card-text class="text-xs-center">
                <v-icon x-large class="primary--text text--lighten-2">mdi-message-text-outline</v-icon>
              </v-card-text>
              <v-card-title primary-title class="layout justify-center">
                <div class="headline">Tell a Friend</div>
              </v-card-title>
              <v-card-text>
                Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare. 
                Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
                Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti. 
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs12 md4>
            <v-card class="elevation-0 transparent">
              <v-card-text class="text-xs-center">
                <v-icon x-large class="primary--text text--lighten-2">mdi-pine-tree</v-icon>
              </v-card-text>
              <v-card-title primary-title class="layout justify-center">
                <div class="headline text-xs-center">About the Spirit of Christmas</div>
              </v-card-title>
              <v-card-text>
                Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare. 
                Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
                Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti. 
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex>
  </v-layout>
  

  </section>
  
</template>

<script>
export default {

}
</script>

<style>
@import url(https://fonts.googleapis.com/css?family=Arvo:700);
@import url(https://fonts.googleapis.com/css?family=Seaweed+Script);
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
