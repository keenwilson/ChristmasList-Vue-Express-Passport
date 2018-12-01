<template>

</template>

<script>
export default {
  computed: {
    users () {
      return (UsersService.index()).data
    }
  }
}
</script>

<style>

</style>
