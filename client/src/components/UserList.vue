<template>

</template>

<script>
export default {
  computed: {
    user () {
      return (UsersService.usersSavedItems()).data
    }
  }
}
</script>

<style>

</style>
