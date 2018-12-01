<template>
  <li class="saveItem">
    <span v-text="saveItem.itemName"></span>
    <v-icon
      class="unSaved"
      @click.native="unsetAsSavedItems(props.item)">
        mdi-close-circle-outline
    </v-icon>
  </li>
  
</template>

<script>
export default {
  name: 'saveItem',
  props: ['saveItem'],
  directives: {
    focus (el, { value }, { context }) {
      if (value) {
        context.$nextTick(() => {
          el.focus()
        })
      }
    }
  }
}
</script>

<style>

</style>
