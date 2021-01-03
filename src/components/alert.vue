<template>
  <div class="alert alert-danger fade show" role="alert">
    {{ message }}
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: null
    }
  }
}
</script>

<style scoped>
.alert {
  max-width: 200px;
  margin: auto;
  text-align: center;
}
</style>
