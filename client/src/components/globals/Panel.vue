<template>
    <div class="white elevation-2 font-Montserrat">
        <v-toolbar flat dense class="primary" dark>
            <v-toolbar-title>{{ title }}</v-toolbar-title>
            <slot name=action>
            </slot>
        </v-toolbar>
        <div class="pl-4 pr-4 pt-2 pb-2">
            <slot>
                No slot content defined.
            </slot>
        </div>
    </div>
</template>

<script>
export default {
  props: [
    'title'
  ]
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Montserrat:400,600');

.font-Montserrat {
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
}
</style>
